import { method } from 'lodash';
import requests from './request'


//获取论坛查询列表
export const reqForumSearchList = (searchtext) => requests({ url: `/talk/study_talk/open/search_source?source=${searchtext}`, method: 'get' })
//获取新闻查询列表
// export const reqNewsSearchList = (searchtext) => requests({ url: `/talk/study_talk/search_source?source=${searchtext}`, method: 'get' })
//获取商城查询列表
export const reqShopSearchList = (searchtext) => requests({ url: `/shop/mess/open/getbyname/${searchtext}`, method: 'get' })
//获取论坛列表
export const reqForumList = (page) => requests({ url: `/talk/study_talk/open/all_studyTalk/${page}`, method: 'get' })
//发帖子
export const repAddForum = (data, token) => requests({ url: `/talk/study_talk/addtalk`, data, headers: { Authorization: `Bearer ${token}` }, method: 'post' })
//收藏帖子
export const repForumcollect = (data, token) => requests({
  url: `/talk/sc/addsc`, data, headers: { Authorization: `Bearer ${token}` }, method: 'post'
})
//取消收藏帖子
export const reqDeleteForumcollect = (id, token) => requests({
  url: `/talk/sc/delsc?sid=${id}`, headers: { Authorization: `Bearer ${token}` }, method: 'get'
})
//点赞帖子
export const repForumlike = (data, token) => requests({
  url: `/talk/likes/addlike`, data, headers: { Authorization: `Bearer ${token}` }, method: 'post'
})
//取消点赞帖子
export const repDeleteForumlike = (id, token) => requests({
  url: `/talk/likes/dislike?like_tid=${id}`, headers: { Authorization: `Bearer ${token}` }, method: 'get'
})
//上传照片
export const repForumimg = (data) => requests({ url: `/user/open/upload`, data, method: 'post' })
//登录
export const repLogin = (data) => requests({ url: `/auth/oauth/token?client_id=XcWebApp&client_secret=XcWebApp&grant_type=password`, data: data, method: 'post' })
//注册
export const repRegister = (data) => requests({ url: `/user/open/logon/`, data, method: 'post' })
//重置密码
export const repForgetPassword = (data) => requests({ url: `/user/open/setpass/`, data, method: 'post' })
//注册验证码
export const repPhonecode = (phone) => requests({ url: `/user/open/sedsms/${phone}`, method: 'get' })
//修改密码验证码
export const repForgetcode = (phone) => requests({ url: `/user/open/send/${phone}`, method: 'get' })
//获取用户信息
export const repUserinfo = (token) => requests({ url: `/user/getuser/`, headers: { Authorization: `Bearer ${token}` }, method: 'get' })
//修改用户信息
export const repChangeUserinfo = (token, data) => requests({ url: `/user/upuser/`, headers: { Authorization: `Bearer ${token}` }, data, method: 'post' })
//获取所有商品
export const repShopList = (page) => requests({ url: `/shop/mess/open/get/${page}`, method: 'get' })
//获取我的商品
export const repgetMyShopList = (token) => requests({ url: `/shop/mess/getMyShop`, headers: { Authorization: `Bearer ${token}` }, method: 'get' })
//修改我的帖子
export const repChangeMyForumList = (data, token) => requests({ url: `/talk/study_talk/Uptalk`, headers: { Authorization: `Bearer ${token}` }, data, method: 'post' })
//修改我的帖子
export const repgetMyForumList = (id, token) => requests({ url: `/talk/study_talk/mytalks?uid=${id}`, headers: { Authorization: `Bearer ${token}` }, method: 'get' })
//删除我的商品
export const repDeleteMyShop = (id, token) => requests({ url: `/shop/mess/delete/${id}`, headers: { Authorization: `Bearer ${token}` }, method: 'delete' })
//删除我的帖子
export const repDeleteMyForum = (id, token) => requests({ url: `/talk/study_talk/deltalk?t_id=${id}`, headers: { Authorization: `Bearer ${token}` }, method: 'get' })
//发布我的商品
export const repaddShop = (data, token) => requests({ url: `/shop/mess/up`, headers: { Authorization: `Bearer ${token}` }, data, method: 'post' })
//获取我收藏的帖子
export const repgetMyForumCollectList = (token) => requests({ url: `/talk/sc/my_sc`, headers: { Authorization: `Bearer ${token}` }, method: 'get' })
//直接购买商品
export const repBuyShop = (id, token) => requests({ url: `/shop/mess/buy/${id}`, headers: { Authorization: `Bearer ${token}` }, method: 'get' })
//加入购物车
export const repJoinShopCar = (id, token) => requests({ url: `/shop/mess/incar/${id}`, headers: { Authorization: `Bearer ${token}` }, method: 'get' })
//获取我的购物车
export const repgetMyShopCar = (token) => requests({ url: `/shop/buy/getmucar`, headers: { Authorization: `Bearer ${token}` }, method: 'get' })
//在购物车购买
export const repBuyOnShopCar = (id, token) => requests({ url: `/shop/buy/inshopCat/${id}`, headers: { Authorization: `Bearer ${token}` }, method: 'get' })
//在购物车删除
export const repDeleteOnShopCar = (id, token) => requests({ url: `/shop/buy/deletShop/${id}`, headers: { Authorization: `Bearer ${token}` }, method: 'delete' })
//获取我买过的商品
export const repgetMyBuyShop = (token) => requests({ url: `/shop/buy/getmubuy`, headers: { Authorization: `Bearer ${token}` }, method: 'get' })
//获取帖字二级评论
export const repgetForumComment = (tid) => requests({ url: `/talk/talk_talk/open/takl_talks?tk_tid=${tid}`, method: 'get' })
//判断是否收藏帖子
export const repForumCollectflag = (data, token) => requests({ url: `/talk/sc/issc`, headers: { Authorization: `Bearer ${token}` }, data, method: 'post' })
//判断是否点赞帖子
export const repForumlikeflag = (data, token) => requests({ url: `/talk/likes/open/islike`, headers: { Authorization: `Bearer ${token}` }, data, method: 'post' })
//评论帖子
export const reppushForumComment = (data, token) => requests({ url: `/talk/talk_talk/addtalk`, headers: { Authorization: `Bearer ${token}` }, data, method: 'post' })
//获取全部新闻
export const repgetNewsList = (page) => requests({ url: `/shop/news/getAllNews`, method: 'get' })
//获取实时新闻
export const repgetNowNewsList = (page) => requests({ url: `/shop/news/getRealNews`, method: 'get' })
//获取热点新闻
export const repgetHotNewsList = (page) => requests({ url: `/shop/news/getHotNews`, method: 'get' })
//获取分类商品
export const repgetClassShopList = (title) => requests({ url: `/shop/mess/open/class/${title}`, method: 'get' })
//获取分类论坛
export const repgetClassForumList = (title) => requests({ url: `/talk/study_talk/open/${title}`, method: 'get' })
//获取热点帖子
export const repgethotForumList = () => requests({ url: `/shop/news/getDiscuss`, method: 'get' })
//获取所有反馈
export const repgetAllfankui = (token) => requests({ url: `/help/open/getAllHelp`, headers: { Authorization: `Bearer ${token}` }, method: 'get' })
//获取我的反馈
export const repgetMyfankui = (token) => requests({ url: `/help/getMyHelp`, headers: { Authorization: `Bearer ${token}` }, method: 'get' })
//获取所有解决方案
export const repgetAllsolution = () => requests({ url: `/help/open/getAllSolve`, method: 'get' })
//获取我的解决方案
export const repgetMysolution = (token) => requests({ url: `/help/getMySolve`, headers: { Authorization: `Bearer ${token}` }, method: 'get' })
//发送反馈
export const reppushfankui = (data, token) => requests({ url: `/help/addHelp`, headers: { Authorization: `Bearer ${token}` }, data, method: 'post' })
//发送解决方案
export const reppushsolution = (data) => requests({ url: `/help/open/solve`, data, method: 'post' })
//删除我的反馈
export const repdeleteMyfankui = (id, token) => requests({ url: `/help/delMyHelp/${id}`, headers: { Authorization: `Bearer ${token}` }, method: 'delete' })
// //删除我的解决方案
// export const repdeleteMysolution = (id, token) => requests({ url: `/help/delMyHelp/${id}`, headers: { Authorization: `Bearer ${token}` }, method: 'delete' })
//删除我的评论
export const repDeleteMycomment = (id, token) => requests({ url: `/talk/talk_talk/deltalk?tk_id=${id}`, headers: { Authorization: `Bearer ${token}` }, method: 'get' })
//修改我的反馈
export const repchangefankui = (data, token) => requests({ url: `/help/addHelp`, headers: { Authorization: `Bearer ${token}` }, data, method: 'post' })
export default {
  reqForumSearchList,
  reqShopSearchList,
  reqForumList,
  repForumcollect,
  repLogin,
  repUserinfo,
  repChangeUserinfo,
  repShopList,
  repgetMyShopList,
  repgetMyForumList,
  repaddShop,
  repgetMyForumCollectList,
  repBuyShop,
  repJoinShopCar,
  repgetMyShopCar,
  repDeleteOnShopCar,
  repBuyOnShopCar,
  repgetMyBuyShop,
  repgetForumComment,
  reppushForumComment,
  reqDeleteForumcollect,
  repDeleteMyForum,
  repDeleteMyShop,
  repForumCollectflag,
  repgetNewsList,
  repgetHotNewsList,
  repgetNowNewsList,
  repgetClassShopList,
  repgetClassForumList,
  repForumlike,
  repDeleteForumlike,
  repForumlikeflag,
  repgethotForumList,
  repChangeMyForumList,
  repgetAllfankui,
  repgetMyfankui,
  repgetAllsolution,
  repgetMysolution,
  reppushfankui,
  reppushsolution,
  repdeleteMyfankui,
  repchangefankui,
  repDeleteMycomment,
  repForgetcode,
  repForgetPassword
}
