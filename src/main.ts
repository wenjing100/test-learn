import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import wenjingUI from './libs'
import vuelazyload from 'vue3-lazy'
import { GET_CARDATA } from './store/actionTypes'

import './assets/css/base.css'
import './assets/css/iconfont.css'


const app = createApp(App);
app.use(store).use(router).use(wenjingUI).mount('#app')
app.use(vuelazyload,{
    loading: 'loading.png',
    error: 'error.png'
  })
//将购物车数据请求 并放到vuex中
store.dispatch(GET_CARDATA,'');