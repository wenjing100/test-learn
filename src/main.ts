import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import wenjingUI from './libs';
// import vuelazyload from 'vue3-lazy';
import vant from 'vant';
import 'vant/lib/index.css';

import './assets/css/base.css';
import './assets/css/iconfont.css';

//h5 rem适配
import 'amfe-flexible';

const app = createApp(App);
app.use(store).use(router).use(wenjingUI).use(vant).mount('#app');


// app.use(vuelazyload,{
//     loading: 'loading.png',
//     error: 'error.png'
//   })