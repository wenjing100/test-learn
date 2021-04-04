<template>
  <div class="par" ref="par">
    <div class="title"><slot name="ti"></slot></div>
    <div class="content"><slot name="co"></slot></div>
  </div>
</template>

<script lang='ts'>
import { defineComponent,onUpdated,ref } from "vue";
export default defineComponent({
  name: "parmitem",
  setup() {
		const par = ref(null);
		const vH = ref(0);
		onUpdated(()=>{
			vH.value = par.value.offsetTop;
		})
    return {
			par,
			vH
		};
  },
});
</script>

<style lang='scss' scoped>
.par {
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid #9b9b9b;
  .title {
    width: 25%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 6px 0 6px 2px;
  }
  .content {
    width: 75%;
    color: var(--color-high-text);
    padding: 6px 5px;
    word-wrap: break-word;
  }
}
</style>