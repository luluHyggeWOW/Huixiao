import { method } from 'lodash';
import requests from './request'

//登录
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, data, method: 'post' })

export const reqSearchList = () => requests({ url: `/posts`, method: 'get' })
//获取论坛列表
export const reqForumList = () => requests({ url: `/talk/study_talk/all_studyTalk`, method: 'get' })
//修改论坛喜欢
export const repForumlike = (data) => requests({ url: `/talk/talk_talk/like_talk`, data, method: 'post' })
//登录
export const repLogin = (data) => requests({ url: `/auth/oauth/token?client_id=XcWebApp&client_secret=XcWebApp&grant_type=password`, data, method: 'post', withCredentials: true })
//验证码
export const repphonecode = (phone) => requests({ url: `/user/open/sedsms/${phone}`, data, method: 'post', withCredentials: true })

export default {
  reqUserLogin,
  reqSearchList,
  reqForumList,
  repForumlike,
  repLogin,
}