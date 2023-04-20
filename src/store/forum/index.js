
import { defineStore } from 'pinia'
import { reqForumList, repForumlike } from '@/api/api';
import { ref, computed } from 'vue'
export const getForumList = defineStore('getlist', () => {

  const forumList = ref({})

  async function getList () {
    //当前这reqSearchList这个函数在调用获取服务器数据的时候 至少传递一个参数（空对象)
    //params形参 是当用户派发action的时候 第二个参数传递过来的 至少是一个空对象
    let result = await reqForumList();
    if (result.code == 200) {
      // console.log('result', result);
      forumList.value = result.data;
    }
    else {

    }
  }
  async function changelike (index) {
    console.log(111, forumList.value[index]);
    var d = new Date();
    var year = String(d.getFullYear())
    var month = d.getMonth() + 1;
    if (month <= 9) {
      month = `0${month}`
    }
    var day = String(d.getDate());
    let time = year + month + day
    let data = {
      like_sid: forumList.value[index].t_id,
      like_uid: forumList.value[index].t_uid,
      like_data: time,
    }
    console.log(data.like_sid, data.like_uid, data.like_data);
    let result = await repForumlike(data);
    if (result.code == 200) {
      console.log('result', result.data);
      //  result.data;
    }
    else {

    }
  }
  const forumsList = () => {
    console.log('state', forumList.value)
    return forumList.value
  }
  return {
    getForumList,
    getList,
    forumsList,
    forumList,
    changelike,
  }

}

)





