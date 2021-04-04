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
  height: 49px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  padding: 3px;
  background: #ffe2e2;
  border-top: 1px solid rgba($color: #424242, $alpha: 0.1);
  i {
    font-size: 20px;
    width: 100%;
    text-align: center;
    display: inline-block;
  }
  p {
    width: 100%;
    font-size: 14px;
    display: block;
  }
  .active {
    color: #ff5000;
  }
}
</style>