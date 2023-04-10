import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import jquery from 'jquery'
import axios from 'axios'
import qs from 'qs'
// app.prototype.$ajax = qs;
const app = createApp(App)

app.config.globalProperties.$ajax = axios;
axios.defaults.baseURL = 'http:127.0.0.1:3333/'

app.use(store).use(router).use(ElementPlus).use(jquery).mount('#app')