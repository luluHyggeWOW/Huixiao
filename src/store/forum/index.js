
import { defineStore } from 'pinia'
import { reqForumList, repForumcollect, reqForumSearchList, repAddForum, repUploadimg, repgetMyForumList } from '@/api/api';
import { ref, reactive } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { usermain } from '@/store/index'
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
export const getForumList = defineStore('getlist', () => {

  const forumList = ref({})
  const searchList = ref({})
  const searchtext = ref({})
  const myforum = ref([])
  const moreforum = ref({})
  let token = localStorage.getItem("huixiao");
  const addforumlist = reactive({
    title: '',
    class: '',
    text: '',
    img: 'null',
  })
  const forumaddshow = ref(false)
  async function getList () {
    let result = await reqForumList(token);
    if (result.code == 200) {
      // console.log('result', result);
      forumList.value = result.data;
      searchList.value = result.data;
      console.log(result.data);
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
  async function changecollect (data) {
    let result = await repForumcollect(data, token);
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
    uuid = uuid.split("-").join("");
    var d = new Date();
    var year = d.getFullYear()
    var month = d.getMonth() + 1;

    if (month <= 9) {
      month = `0${month}`
    }
    var day = d.getDate();
    console.log('day', day);
    if (day <= 9) {
      day = `0${day}`
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

    let result = await repAddForum(data, token);
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
    const store2 = usermain();
    let id = store2.userinfo.userId
    let result = await repgetMyForumList(id, token);
    console.log('result', result);
    if (result.code == 200) {
      console.log('data', result.data);
      myforum.value = result.data
      console.log('myforum.value11', myforum.value);
    }
    else {

    }

  }

  return {
    getForumList,
    getList,
    forumList,
    changecollect,
    getSearchList,
    searchtext,
    searchList,
    AddForum,
    addforumlist,
    getmyForumList,
    forumaddshow,
    myforum
  }

}

)





