<template>
  <div id="main">
    <tabitem
      v-for="(item, index) in tabdata"
      :key="index"
      @click="itemclick(item, index)"
    >
      <i :class="['iconfont',item.icon,currentIndex !== index?'':'active']"></i>
      <p :class="{ active: currentIndex === index }">{{ item.title }}</p>
    </tabitem>
  </div>
</template>

<script lang='ts'>
import tabitem from "./tabItem.vue";
import tabdata from "../../data/tabData";
import { reactive, toRefs,  } from "vue";
import { useRouter } from 'vue-router'


export default {
  name: "tabbar",
  components: {
    tabitem,
  },
  setup() {
    const state = reactive({
      currentIndex: -1,
    });
    const router = useRouter();
    const itemclick = (item, index) => {
      router.replace(item.path);
      state.currentIndex = index;
    };
    return {
      ...toRefs(state),
      tabdata,
      itemclick,
    };
  },
};
</script>

<style lang='scss' scoped>

#main {
  width: 100%;
  height: 59px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  padding: 5px;
  background: #ffe2e28c;
  border-top: 1px solid rgba($color: #424242, $alpha: 0.1);
  img {
    width: 30px;
    height: 30px;
  }
  .active {
    color: #ff5000;
    font-weight: bold;
  }
}
</style>