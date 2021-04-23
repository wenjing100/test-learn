<template>
  <div class="slidcon">
    <div class="slid-content">
      <div class="slid-content-slotarea"
        @touchstart="tstart($event)"
        @touchend="tend($event)"
      ><slot>这里是内容</slot>
      </div>
      <div class="slid-content-delbtn" @click="slidDelClick">
        删除
      </div>
    </div>
  </div> 
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, ref } from "vue";
export default defineComponent({
  name: "sliddel",
  emits:['slidDelClick'],
  setup(props,{emit}) {
    const state = reactive({
      startX:0,
    })
    const tstart = (e) => {
      state.startX = e.touches[0].clientX;
      e.currentTarget.parentElement.removeAttribute('swip');
    };
    const tend = (e)=>{
      let x = e.changedTouches[0].clientX;
      // e.currentTarget.parentElement 必须要在父容器添加
      if(x - state.startX < -20){
        e.currentTarget.parentElement.setAttribute('swip',1);
      }else if(x - state.startX > 20){
        e.currentTarget.parentElement.removeAttribute('swip');
      }
    }
    const slidDelClick = ()=>{
      emit('slidDelClick')
    }
    return {
      ...toRefs(state),
      tstart,
      tend,
      slidDelClick
    };
  },
});
</script>

<style lang='scss' scoped>
.slidcon {
  width: 100%;
  /* min-height: 110px; */
  /* overflow: hidden; */
  height: inherit;
  .slid-content {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    position: relative;
    width: calc(100% + 40px);
    height: inherit;
    transition: all .2s;
    /* 动画偏移定位 */
    margin-left: -40px;
    transform: translateX(40px);
    &-slotarea{
      position: absolute;
      height: inherit;
      width: calc(100% - 40px);
      left:0;
      border: 1px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-delbtn {
      position: absolute;
      right: 0;
      top: 0;
      background: crimson;
      transition: all .2s;
      color: #fff;
      width: 40px;
      height: inherit;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &[swip]{
      transform: translateX(0);
    }
  }
}
</style>