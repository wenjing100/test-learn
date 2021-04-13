<template>
  <div class="morecon">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
  name: "memoreone",
});
</script>

<style lang='scss' scoped>
.morecon{
  width: 100%;
  border-bottom: 15px solid var(--color-background-light);
}
</style>