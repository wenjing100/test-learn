<template>
  <div class="mytoast">
    <transition name="mytoast">
      <div class="inner" v-show="isVisible">
        <div class="message">
          {{ message }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "toast",
  props:{
    message:{
      type:String,
      default:'消息'
    },
    delay:{
      type:Number,
      default:2000
    }
  },
  setup(){
    const isVisible = ref(false);
    const open = ()=>{
      isVisible.value = true;
    }
    const close = ()=>{
      isVisible.value = false;
    }
    return{
      isVisible,
      open,
      close
    }
  }
});
</script>

<style lang='scss' scoped>
.mytoast{
  z-index: 99;
  position: fixed;
  left: 0;
  right: 0;
  top:0;
  bottom: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  .inner{
    padding: 10px;
    background: rgba(0,0,0,.6);
    color: #fff;
    border-radius: 5px;
  }
}
.mytoast-enter-active,.mytoast-leave-active{
  transition: all 0.3s;
}
.mytoast-enter-from,.mytoast-leave-to{
  opacity: 0;
  transform: translateY(100%);
}
</style>