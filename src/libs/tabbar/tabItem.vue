<template>
  <div id="item">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
// import { reactive, toRefs, getCurrentInstance } from "vue";

export default {
  name: "tabitem",
};
</script>

<style lang='scss' scoped>
.item {
  display: flex;
  flex-direction: column;
  justify-items: center;
  min-width: 30px;
  text-align: center;
  p {
    width: 100%;
    font-size: 14px;
    display: block;
  }
}
</style>