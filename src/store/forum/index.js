
import { defineStore } from 'pinia'
import { reqForumList, repForumlike, reqSearchList, repAddForum, repForumimg } from '@/api/api';
import { ref, reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { user } from '@/store/index'
import { storeToRefs } from 'pinia';
export const getForumList = defineStore('getlist', () => {

  const forumList = ref({})
  const searchList = ref({})
  const searchtext = ref({})
  const myforum = ref({})
  const addforumlist = ref({
    title: '',
    class: '',
    text: '',
    img: ''
  })
  async function getList () {
    let result = await reqForumList();
    if (result.code == 200) {
      // console.log('result', result);
      forumList.value = result.data;
    }
    else {

    }
  }
  async function getSearchList () {
    let result = await reqSearchList(searchtext.value);
    console.log(result);
    if (result.code == 200) {
      // console.log('result', result);
      searchList.value = result.data;
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

    data = JSON.stringify(data)
    console.log(data);
    let result = await repForumlike(data);
    console.log(result);
    // if (result.code == 200) {
    //   console.log('result', result.data);
    //   //  result.data;
    // }
    // else {

    // }
  }
  async function AddForum () {
    let uuid = uuidv4()
    var d = new Date();
    var year = String(d.getFullYear())
    var month = d.getMonth() + 1;
    if (month <= 9) {
      month = `0${month}`
    }
    var day = String(d.getDate());
    let data = {
      t_id: uuid,
      t_uid: '',
      t_img: '',
      t_source: addforumlist.text,
      t_date: day,
      t_usc_count: 0,
      t_like_count: 0,
      t_status: "正常",
    }
    console.log(uuid);
    data = JSON.stringify(data)
    let result = await repAddForum(data);
    if (result.code == 200) {
      console.log('result', result.data);
      //  result.data;
    }
    else {

    }
  }
  async function getmyforum () {
    if (JSON.stringify(forumList.value) == '{}') {
      const store = getForumList();
      await store.getList()
    }
    const store = user();
    let useid = store.user.id
    let forum = forumList.value
    for (let i = 0; i < forum.length; i++) {
      if (forum[i].t_uid == useid) {
        console.log(forum[i]);
        myforum.value[0] = forum[i]
        // myforum.value += JSON.stringify(forum[i])
      }
    }
    console.log(forumList);
    console.log('myforum', myforum, myforum.value);
    // data = JSON.stringify(data)
    // let result = await repAddForum(data);
    // if (result.code == 200) {
    //   console.log('result', result.data);
    //   //  result.data;
    // }
    // else {

    // }
  }
  return {
    getForumList,
    getList,
    forumList,
    changelike,
    getSearchList,
    searchtext,
    searchList,
    AddForum,
    addforumlist,
    getmyforum
  }

}

)





