<template>
  <router-view>
  </router-view>

  <tabbar v-if="!isdetails"></tabbar>
</template>
<script lang="ts">
import { watch, ref, } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const isdetails = ref(false);
    let route = useRoute();
    watch(
      () => {
        return route.path;
      },
      (val) => {
        //判断路由，如果进入详情页就隐藏tabbar
        if (val.includes("details")) {
          isdetails.value = true;
        } else {
          isdetails.value = false;
        }
      }
    );
    
    return {
      isdetails,
    };
  },
};
</script>
<style lang="scss">
</style>
