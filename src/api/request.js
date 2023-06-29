//对于axios进行二次封装
import router from "@/router";
import axios from "axios";
import { user } from '@/store/index'
import { ElMessage } from 'element-plus';
//1 利用axios对象的方法create 去创建一个 axios实例
//2 request 就是axios 只不过稍微配置一下

const requests = axios.create({
  //配置对象
  //基础路径，发请求路径应当会出现api
  baseURL: "http://101.43.241.101:63010",
  //代表请求超时时间5s
  timeout: 5000
});
//请求拦截器：再发请求之前 请求拦截器可以监测到 ，可以再请求发出之前做一些事情
requests.interceptors.request.use((config) => {
  //congif:配置对象，对象里面有一个属性很重要 headers请求头
  //进度条开始动
  // console.log(store);
  // let store = user()
  // if (store.user.token) {
  //   //   //给请求头添加一个字段 userTempId
  //   config.headers.userTempId = store.user.token
  // }
  // // nprogress.start();
  return config;
});
requests.interceptors.response.use((res) => {
  //成功的回调函数：服务器响莹数据回来以后 响莹拦截器可以检测到 可以做一些事
  //进度条结束
  // nprogress.done();
  // const token = response.headers.token;
  // if (token) {
  //   window.localStorage.setItem('token', token)
  // }
  // response.headers.putuid = window.localStorage.getItem('token')
  // if (response.data.code === 401) router.push({ name: 'Login' })
  // return response
  return res.data;
}, (err) => {
  //响应失败的回调函数
  // console.log(route.path);
  const currentRoute = router.currentRoute
  if (err.response.status == 401) {
    if (currentRoute.value.path == '/login') {
      ElMessage.error('账号或密码错误！')
    }
    else {
      ElMessage.warning('登录后才能操作哦！')
    }

  }
  else if (err.response.status == 503) {
    ElMessage.warning('服务器正在维护！')
  }
  else {
    ElMessage.warning(err.message)
  }

  // return new Promise();
});


export default requests;