import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import jquery from 'jquery'
import VueSplide from '@splidejs/vue-splide'
import requests from './api/api'
import pinia from '@/store'
import { createPinia } from 'pinia'
import mitt from "mitt";

const app = createApp(App)

// main.js
// ElementPlus.Dialog.props.lockScroll.default = false;
app.config.globalProperties.$request = requests
app.use(store).use(router).use(ElementPlus)
  .use(jquery).use(VueSplide).use(pinia).use(createPinia()).mount('#app')
app.config.globalProperties.mittBus = new mitt()