<template>
  <div class="sortbar">
    <div
      class="sort-item"
      v-for="(item, index) in sortTitle"
      :key="index"
      @click="clickitem(index)"
      :class="{ active: index === currentIndex }"
    >
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "sortbar",
  props: {
    sortTitle: Array,
  },
  setup(props,ctx) {
    let currentIndex = ref(0);

    const clickitem = (index: number) => {
      currentIndex.value = index;
      ctx.emit('changetype',index);
    };
    return {
      currentIndex,
      clickitem,
    };
  },
});
</script>

<style lang='scss' scoped>
.sortbar {
  display: flex;
  justify-content: space-around;
  width: 100%;
  background: #fff;
  height: 40px;
  line-height: 40px;
  z-index: 10;
  margin-bottom: 10px;
  .sort-item {
    padding: 5px;
    font-size: 16px;
  }
  .sort-item.active {
    border-bottom: 3px solid var(--color-high-text);
    color: var(--color-high-text);
  }
}
</style>