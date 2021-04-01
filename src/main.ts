import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import wenjingUI from './libs'


import './assets/css/base.css'
import './assets/css/iconfont.css'

const app = createApp(App);
app.use(store).use(router).use(wenjingUI).mount('#app')
