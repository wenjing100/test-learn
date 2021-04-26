<template>
  <div class="meitemcon" @click="msgclick">
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <span class="msg" >
      <slot name="msg"></slot>
    </span>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  name: "meitem",
  emits:['msgclick'],
  setup(props,{emit}){

    const msgclick = ()=>{
      emit('msgclick');
    }
    return{
      msgclick
    }
  }
});
</script>

<style lang='scss' scoped>
.meitemcon{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 44px;
  width: 100%;
  .icon{
    width: 60px;
    height: 100%;
    color:var(--color-high-text);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 8px;
  }
  .msg{
    flex: 1;
    text-align: left;
    height: 100%;
    color: #000;
    font-size: 18px;
    padding: 8px 5px;
    border-bottom: 1px solid #cecece;
    box-sizing: border-box;

  }
}
</style>