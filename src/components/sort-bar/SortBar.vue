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
  setup() {
    let currentIndex = ref(0);

    const clickitem = (index: number) => {
      currentIndex.value = index;
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
  height: 44px;
  line-height: 44px;
  .sort-item {
    padding: 5px;
    font-size: 14px;
  }
  .sort-item.active {
    border-bottom: 3px solid var(--color-high-text);
    color: var(--color-high-text);
  }
}
</style>