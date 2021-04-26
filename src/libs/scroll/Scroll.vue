<template>
  <div class="wraper" ref="myscroll" :style="{height:wraperHeight}">
    <div class="content" >
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, nextTick, onMounted, reactive, ref, toRefs, watch } from "vue";
import BScroll from "better-scroll";
import { useStore } from "vuex";
export default defineComponent({
  name: "myscroll",
  props: {
    probtype: {
      type: Number,
      default: 0,
    },
    recount:{
      type:Boolean,
      default:false
    },
    moreHeight:{
      type:Number,
      default:0
    }
  },
  setup(props, ctx) {
    const myscroll = ref(null);
    const store = useStore();
    let state = reactive<{ bs: BScroll, wraperHeight:string}>({
      bs: null,
      wraperHeight: '812px'
    });
    onMounted(async ()=>{
      await nextTick(() => {
        state.bs = new BScroll(myscroll.value, {
          //默认情况bsscroll里面的元素 如div是不可以带点击事件的，要click true才可以
          click: true,
          probeType: props.probtype,
          pullUpLoad: true,
          disableMouse: false,
          disableTouch: false,
        });
        //滚动监听
        state.bs.on("scroll", (p) => {
          ctx.emit("scrollmove", p);
        });
        //上拉时候监听
        state.bs.on("pullingUp", () => {
          ctx.emit("pullupload");
          state.bs.refresh();
          // state.wraperHeight = document.documentElement.clientHeight -44 + 'px';
        });
        state.bs.refresh();
      });
    })
    //滚动到指定位置函数
    const scrollPosition = (x: number, y: number, time: number): void => {
      state.bs.scrollTo(x, y, time);
    };
    //上拉结束必须要执行
    const finishpullup = (): void => {
      state.bs.finishPullUp();
    };
    //刷新
    const pull_refresh = (): void => {
      state.bs.refresh();
    };
    //滚动到指定元素方法-----
    const scroll_to_elem = (el)=>{
      state.bs.scrollToElement(el,300,0,0);
    }
    //监视 store中的view-port值
    watch(()=>{
      return store.state.viewport_height;
    },(val)=>{
      state.wraperHeight = val;
      state.bs.refresh();
    })
    return {
      ...toRefs(state),
      myscroll,
      scrollPosition,
      finishpullup,
      pull_refresh,
      scroll_to_elem
    };
  },
});
</script>

<style lang='scss' scoped>
</style>