<template>
  <div class="toast" v-show="isShow">
    <p>{{ content }}</p>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "toast",
  setup() {
    let id = null;
    const state = reactive({
      isShow: false,
      content:''
    });

    const showinfo = (t: number, msg: string) => {
      state.content = msg;
      state.isShow = true;
      id = setTimeout(() => {
        clearTimeout(id);
        id = null;
        state.isShow = false;
      }, t);
    }

    return {
      ...toRefs(state),
      showinfo
    };
  },
});
</script>

<style lang='scss' scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 100px;
  min-height: 30px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 2px;
  color: #fff;
  padding: 2px;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  p{
      text-align: center;
      font-size: 14px;
      color: #fff;
      padding: 0 2px;
  }
}
</style>