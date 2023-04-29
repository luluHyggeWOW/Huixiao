
import { defineStore } from 'pinia'
import { reqForumList, repForumlike, reqForumSearchList, repAddForum, repUploadimg } from '@/api/api';
import { ref, reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { usermain } from '@/store/index'
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
export const getForumList = defineStore('getlist', () => {

  const forumList = ref({})
  const searchList = ref({})
  const searchtext = ref({})
  const myforum = ref({})
  const addforumlist = reactive({
    title: '',
    class: '',
    text: '',
    img: 'null',
  })
  const forumaddshow = ref(false)
  async function getList () {
    let result = await reqForumList();
    if (result.code == 200) {
      // console.log('result', result);
      forumList.value = result.data;
      searchList.value = result.data;
    }
    else {

    }
  }
  async function getSearchList () {
    let result = await reqForumSearchList(searchtext.value);
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
    console.log(1111, getForumList);
    let uuid = uuidv4()
    uuid = uuid.split("-").join("");
    var d = new Date();
    var year = d.getFullYear()
    var month = d.getMonth() + 1;
    if (month <= 9) {
      month = `0${month}`
    }
    var day = d.getDate();
    if (day <= 9) {
      month = `0${day}`
    }
    let date = `${year}-${month}-${day}`;
    const store = usermain();
    let data = {
      t_id: uuid,
      t_uid: store.userinfo.id,
      t_img: addforumlist.img,
      t_source: addforumlist.text,
      t_date: date,
      t_usc_count: 0,
      t_like_count: 0,
      t_status: "正常",
    }
    let result = await repAddForum(data);
    if (result.code == 200) {
      console.log('result', result.data);
      ElMessage.success('发布成功！')
      //  result.data;


    }
    else {
      ElMessage.error('发布失败！')
    }
  }
  async function getmyForumList () {
    let token = localStorage.getItem("huixiao");
    let result = await repgetMyForumList(token);
    console.log(result);
    if (result.code == 200) {
      myforum.value = result.data
    }
    else {

    }

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
    getmyForumList,
    forumaddshow
  }

}

)





