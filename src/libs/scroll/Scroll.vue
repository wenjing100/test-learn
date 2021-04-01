<template>
    <div class="wraper" ref="myscroll" >
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref, toRefs} from 'vue'
import BScroll, { Options } from 'better-scroll';
  export default defineComponent({
      name: 'myscroll',
      props:{
          probtype:{
              type:Number,
              default:0
          }
      },
      setup(props,ctx){
          const myscroll = ref(null)
        //   let bs = ref(null);
        let state = reactive<{bs:BScroll}>({
            bs:null,
        })
          onMounted(()=>{
            state.bs = new BScroll(myscroll.value,{
              //默认情况bsscroll里面的元素 如div是不可以带点击事件的，要click true才可以
             click:true,
             probeType:props.probtype,
             pullUpLoad:true
            }) 
            //滚动监听
            state.bs.on('scroll',(p)=>{
              ctx.emit('scrollmove',p)
            })
            //上拉时候监听
            state.bs.on('pullingUp',()=>{
                console.log('上拉')
              ctx.emit('pullupload')
            })
            state.bs.refresh()
          })
          //滚动到指定位置函数
          const scrollPosition = (x:number, y:number, time:number):void =>{
              state.bs.scrollTo(x,y,time);
          }
          //上拉函数
          const finishpullup = ():void=>{
              state.bs.finishPullUp();
          }
          const pull_refresh = ():void => {
              state.bs.refresh()
          }
          return{
              ...toRefs(state),
              myscroll,
              scrollPosition,
              finishpullup,
              pull_refresh
          }
      }
  })
</script>

<style lang='scss' scoped>

</style>