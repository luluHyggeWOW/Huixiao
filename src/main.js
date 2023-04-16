import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import jquery from 'jquery'
import VueSplide from '@splidejs/vue-splide'
import requests from './api/api'
// import axios from 'axios'
const app = createApp(App)

// main.js

app.config.globalProperties.$request = requests
app.use(store).use(router).use(ElementPlus)
  .use(jquery).use(VueSplide).mount('#app')