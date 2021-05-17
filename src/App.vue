<template>

  <router-view></router-view>

  <tabbar v-if="!isdetails"></tabbar>
</template>
<script lang="ts">
import { watch, ref, onBeforeMount, } from "vue";
import { useRoute } from "vue-router";
import { useStore } from 'vuex';
import { SET_LOGIN_STATUS, SET_VIEWPORT, TOKEN_FROM_LOCAL } from './store/actionTypes';

import { checkLogStatus } from './network/login';
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
    //检测登陆状态并修改
    onBeforeMount(async()=>{
      let homeUn = unescape(localStorage.getItem('userName')) || '';
      console.log(homeUn)
      if(homeUn){
        let logQuery = await checkLogStatus(homeUn);
        if(logQuery.code){
          //登陆成功，修改状态
          store.commit(SET_LOGIN_STATUS,true);
        }else{
          store.commit(SET_LOGIN_STATUS,false);
        }
      }
    })
    
    return {
      isdetails,
    };
  },
};
</script>
<style lang="scss">

</style>
