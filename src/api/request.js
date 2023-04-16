//对于axios进行二次封装
import router from "@/router";
import axios from "axios";

import store from '@/store'

//1 利用axios对象的方法create 去创建一个 axios实例
//2 request 就是axios 只不过稍微配置一下
const requests = axios.create({
  //配置对象
  //基础路径，发请求路径应当会出现api
  baseURL: "http://192.168.43.7:8082/",
  //代表请求超时时间5s
  timeout: 5000
});
//请求拦截器：再发请求之前 请求拦截器可以监测到 ，可以再请求发出之前做一些事情
requests.interceptors.request.use((config) => {
  //congif:配置对象，对象里面有一个属性很重要 headers请求头
  //进度条开始动
  // console.log(store);
  // if (store.state.deatil.uuid_token) {
  //   //给请求头添加一个字段 userTempId
  //   config.headers.userTempId = store.state.deatil.uuid_token
  // }
  // nprogress.start();
  return config;
});
requests.interceptors.response.use((res) => {
  //成功的回调函数：服务器响莹数据回来以后 响莹拦截器可以检测到 可以做一些事
  //进度条结束
  // nprogress.done();
  return res.data;
}, (err) => {
  //响应失败的回调函数
  alert(err.message);
  return new Promise();
});


export default requests;