import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import jquery from 'jquery'



createApp(App).use(store).use(router).use(ElementPlus).use(jquery).mount('#app')
