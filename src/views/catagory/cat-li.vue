<template>
  <div class="catli" :class="{active:isactive}">
    <span><slot></slot></span>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  name: "catli",
  setup() {
    const state = reactive({
      isactive: false,
    });
    return {
      ...toRefs(state)
    };
  },
});
</script>

<style lang='scss' scoped>
.catli{
  color: #000;
  background:var(--color-background-light);
  span{
    height: 44px;
    line-height: 44px;
    text-align: center;
    width: 100%;
    display: inline-block;
    font-size: 16px;
  }
}
.active{
  color: var(--color-high-text);
  background: #fff;
  border-left: 2px solid red;
}
</style>