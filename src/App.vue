<template>
  <router-view>
  </router-view>

  <tabbar v-if="!isdetails"></tabbar>
</template>
<script lang="ts">
import { watch, ref, } from "vue";
import { useRoute } from "vue-router";
import { useStore } from 'vuex';
import { SET_VIEWPORT, TOKEN_FROM_LOCAL } from './store/actionTypes';
import { getToken } from './hooks/checkLogin'
export default {
  setup() {
    const isdetails = ref(false);
    const store = useStore();
    let route = useRoute();
    //判断路由，在detail页面隐藏tabbar
    watch(
      () => {
        return route.path;
      },
      (val) => {
        //判断路由，如果进入详情页就隐藏tabbar
        if (val.includes("details") || val.includes("login") || val.includes("register")) {
          isdetails.value = true;
        } else {
          isdetails.value = false;
        }
      }
    );
    //监视视口高度
    window.onresize = ()=>{
      let h = document.documentElement.clientHeight;
      store.commit(SET_VIEWPORT,h);

    }
    let tk = localStorage.getItem('token');
    if(tk){
        store.commit(TOKEN_FROM_LOCAL, true);
        console.log(tk)
    }
    return {
      isdetails,
    };
  },
};
</script>
<style lang="scss">

</style>
