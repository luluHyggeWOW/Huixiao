import { method } from 'lodash';
import requests from './ajax'

//登录
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, data, method: 'post' })

// export const reqSearchList = () => requests({ url: `http://192.168.43.7:8082/study_talk/search_source?source=ce`, method: 'get' })