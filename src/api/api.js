import { method } from 'lodash';
import requests from './request'

//登录
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, data, method: 'post' })

export const reqSearchList = (searchtext) => requests({ url: `/study_talk/search_source?source=ce`, searchtext, method: 'get' })

export default {
  reqUserLogin,
  reqSearchList
}