import { method } from 'lodash';
import requests from './request'


//获取论坛查询列表
export const reqForumSearchList = (searchtext) => requests({ url: `/talk/study_talk/search_source?source=${searchtext}`, method: 'get' })
//获取新闻查询列表
export const reqNewsSearchList = (searchtext) => requests({ url: `/talk/study_talk/search_source?source=${searchtext}`, method: 'get' })
//获取商城查询列表
export const reqShopSearchList = (searchtext) => requests({ url: `/shop/mess/open/${searchtext}`, method: 'get' })
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
export const repLogin = (data) => requests({ url: `/auth/oauth/token?client_id=XcWebApp&client_secret=XcWebApp&grant_type=password`, data: data, method: 'post' })
//注册
export const repRegister = (data) => requests({ url: `/user/open/logon/`, data, method: 'post' })
//验证码
export const repPhonecode = (phone) => requests({ url: `/user/open/sedsms/${phone}`, method: 'get' })
//获取用户信息
export const repUserinfo = (token) => requests({ url: `/user/getuser/`, headers: { Authorization: `Bearer ${token}` }, method: 'get' })
//修改用户信息
export const repChangeUserinfo = (token, data) => requests({ url: `/user/upuser/`, headers: { Authorization: `Bearer ${token}` }, data, method: 'post' })
//获取所有商品
export const repShopList = () => requests({ url: `/shop/mess/open/get/1`, method: 'get' })
//获取我的商品
export const repgetMyShopList = (token) => requests({ url: `/shop/mess/getMyShop`, headers: { Authorization: `Bearer ${token}` }, method: 'get' })
//获取我的论坛
export const repgetMyForumList = (token) => requests({ url: ``, headers: { Authorization: `Bearer ${token}` }, method: 'get' })





export default {
  reqForumSearchList,
  reqNewsSearchList,
  reqShopSearchList,
  reqForumList,
  repForumlike,
  repLogin,
  repUserinfo,
  repChangeUserinfo,
  repShopList,
  repgetMyShopList,
  repgetMyForumList
}