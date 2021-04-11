<template>
  <div class="slidcon">
    <div class="slid-del-content">
      <div class="slotarea"
        @touchstart="tstart($event)"
        @touchend="tend($event)"
      ><slot>这里是内容</slot></div>
      <div class="delbtn">
        <div class="del" @click="slidDelClick">删除</div>
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
  min-height: 120px;
  overflow: hidden;
  height: inherit;
  .slid-del-content {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;

    position: relative;
    width: calc(100% + 40px);
    height: inherit;

    transition: all .2s;
    margin-left: -40px;
    transform: translateX(40px);
    .slotarea{
      position: absolute;
      width: calc(100% - 40px);
      left:0;
    }
    .delbtn {
      position: absolute;
      right: 0;
      top: 2.5px;
      background: crimson;
      transition: all .2s;
      color: #fff;
      width: 40px;
      min-height: 110px;
      display: flex;
      justify-content: center;
      align-items: center;
      .del{
        width: 100%;
        height: 100%;
        text-align: center;
      }
    }
  }
  .slid-del-content[swip]{
    transform: translateX(0);
  }
}
</style>