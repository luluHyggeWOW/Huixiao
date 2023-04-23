import { method } from 'lodash';
import requests from './request'

//登录
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, data, method: 'post' })
//获取搜索内容
export const reqSearchList = (searchtext) => requests({ url: `/talk/study_talk/search_source?source=${searchtext}`, method: 'get' })
//获取论坛列表
export const reqForumList = () => requests({ url: `/talk/study_talk/all_studyTalk`, method: 'get' })
//发帖子
export const repAddForum = (data) => requests({ url: `/talk/study_talk/addtalk`, data, method: 'post' })
//修改论坛喜欢
export const repForumlike = (data) => requests({
  url: `/talk/talk_talk/like_talk`, data, headers: { 'Content-Type': 'application/json' }, method: 'post'
})
//上传照片
export const repForumimg = (data) => requests({ url: `/user/open/upload`, data, method: 'post' })
//登录
export const repLogin = (data) => requests({ url: `/auth/oauth/token?client_id=XcWebApp&client_secret=XcWebApp&grant_type=password`, data, method: 'post' })
//注册
export const repRegister = (data) => requests({ url: `/auth/oauth/token?client_id=XcWebApp&client_secret=XcWebApp&grant_type=password`, data, method: 'post' })
//验证码
export const repPhonecode = (phone) => requests({ url: `/user/open/sedsms/${phone}`, method: 'get' })
//获取用户信息
export const repUserinfo = (phone) => requests({ url: `/user/open/sedsms/${phone}`, method: 'get' })

export default {
  reqUserLogin,
  reqSearchList,
  reqForumList,
  repForumlike,
  repLogin,
}