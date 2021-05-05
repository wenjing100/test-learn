import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import wenjingUI from './libs';
// import vuelazyload from 'vue3-lazy';
import interceptors from './network/interceptor';
import vant from 'vant';
import 'vant/lib/index.css';

import './assets/css/base.css';
import './assets/css/iconfont.css';

//h5 rem适配
import 'amfe-flexible';

const app = createApp(App);
app.use(store).use(router).use(wenjingUI).use(vant).mount('#app');

// 请求拦截添加请求头
interceptors();

// app.use(vuelazyload,{
//     loading: 'loading.png',
//     error: 'error.png'
//   })