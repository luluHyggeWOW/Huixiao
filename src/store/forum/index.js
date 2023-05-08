
import { defineStore } from 'pinia'
import {
  reqForumList, repForumcollect, reqForumSearchList, repAddForum, repUploadimg,
  repgetMyForumList, repgetMyForumCollectList, repgetForumComment, reppushForumComment,
  reqDeleteForumcollect, repDeleteMyForum, repForumCollectflag, repForumlike, repDeleteForumlike,
  repForumlikeflag, repgetClassForumList, repgethotForumList, repChangeMyForumList, repDeleteMycomment
} from '@/api/api';
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
  const myForumCollectList = ref({})
  const ForumCommenttList = ref({})
  const ForumCollectflag = ref({})
  const Forumlikeflag = ref({})
  const isAlllist = ref(true)
  const page = ref(1)
  const hotForumList = ref({})
  let token = localStorage.getItem("huixiao");
  const addforumlist = reactive({
    title: '',
    class: '',
    text: '',
    img: 'null',
  })
  const forumaddshow = ref(false)
  const list = [];
  const allrealylist = ref();
  async function getList () {
    let result = await reqForumList(page.value)
    token = localStorage.getItem("huixiao");
    if (result.code == 200 && result.data.length) {
      await Forumlikedcollect(result.data)
      console.log(token);
      if (token != null) {
        allrealylist.value.forEach(e => {
          list.push(e)
        });
        forumList.value = list
      }
      else {
        result.data.forEach(e => {
          list.push(e)
        });
        forumList.value = list

      }
      page.value++

    }
    else {

    }

  }
  async function getSearchList () {
    let result = await reqForumSearchList(searchtext.value);
    if (result.code == 200) {
      searchList.value = result.data;
      await Forumlikedcollect(searchList.value)
    }
    else {

    }
  }
  async function changecollect (data) {

    let result = await repForumcollect(data, token);
    if (result.code != 200) {
      ElMessage.warning('已收藏')
    } else {
      ElMessage.success('收藏成功')
    }

  }
  async function changelike (data) {

    let result = await repForumlike(data, token);
    if (!result) {
      console.log(result);
    }
    if (result.code != 200) {
      ElMessage.warning('已点赞')
    } else {
      ElMessage.success('点赞成功')
    }

  }
  async function AddForum () {
    let uuid = uuidv4()
    uuid = uuid.split("-").join("");
    const store = usermain();
    let data = {
      t_id: uuid,
      t_img: addforumlist.img,
      t_source: addforumlist.text,
      t_title: `#${addforumlist.class} ${addforumlist.title}`,
    }
    let result = await repAddForum(data, token);
    if (result.code == 200) {
      ElMessage.success('发布成功！')
      //  result.data;
    }
    else {
      ElMessage.error('发布失败！')
    }
  }
  async function AddChangeMyForumList (data) {
    let result = await repChangeMyForumList(data, token);
    if (result.code == 200) {
      ElMessage.success('修改成功！')
      //  result.data;
    }
    else {
      ElMessage.error('修改失败！')
    }
  }
  async function getmyForumList () {
    const store2 = usermain();
    let id = store2.userinfo.userId
    let result = await repgetMyForumList(id, token);
    if (result.code == 200) {
      myforum.value = result.data
    }
    else {
    }
  }
  async function getmyForumCollectList () {
    let result = await repgetMyForumCollectList(token);
    if (result.code == 200) {
      myForumCollectList.value = result.data
    }
    else {
      ElMessage.error('加载失败')
    }

  }
  async function getForumCommenttList (tid) {
    let result = await repgetForumComment(tid);
    if (result.code == 200) {
      ForumCommenttList.value = result.data
    }
    else {

    }

  }
  async function pushForumComment (data) {
    let result = await reppushForumComment(data, token);
    if (result.code == 200) {
      ElMessage.success('评论成功！')
    }
    else {
      ElMessage.error('评论失败！')
    }

  }
  async function DeleteForumcollect (id) {
    let result = await reqDeleteForumcollect(id, token);
    if (result.code == 200) {
      ElMessage.success('取消成功！')
    }
    else {
      ElMessage.error('取消失败！')
    }

  }
  async function DeleteMyForum (id) {
    let result = await repDeleteMyForum(id, token);
    if (result.code == 200) {
      ElMessage.success('取消成功！')
    }
    else {
      ElMessage.error('取消失败！')
    }

  }
  async function getForumCollectflag (data) {
    let result = await repForumCollectflag(data, token);
    if (result) {
      if (result.code == 200) {
        ForumCollectflag.value = result.data
      }
      else if (result.code == 201) {

      }
    }
  }
  async function getForumlikeflag (data) {
    let result = await repForumlikeflag(data, token);
    if (result) {
      if (result.code == 200) {
        Forumlikeflag.value = result.data
      }
      else if (result.code == 201) {
      }
    }
  }
  async function DeleteForumlike (id) {
    let result = await repDeleteForumlike(id, token);
    if (result.code == 200) {
      ElMessage.success('取消成功！')
    }
    else {
      ElMessage.error('取消失败！')
    }

  }
  async function getClassForumList (title) {
    let result = await repgetClassForumList(title);
    if (result.code == 200) {
      searchList.value = result.data
      await Forumlikedcollect(searchList.value)
    }
  }
  async function gethotForumList () {
    let result = await repgethotForumList();
    if (result.code == 200) {
      hotForumList.value = result.data
    }

  }
  async function Forumlikedcollect (list) {
    if (localStorage.getItem("huixiao")) {
      let e = list
      let listtid = {}
      let keys = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"];
      for (let i = 0; i < e.length; i++) {
        listtid[keys[i]] = e[i].t_id
      }
      if (e.length < 8) {
        for (let l = e.length - 1; l < 8; l++) {
          listtid[keys[l]] = 'null'
        }
      }
      let resultCollect = await getForumCollectflag(listtid)
      let resultlike = await getForumlikeflag(listtid)
      // console.log(ForumCollectflag.value[t1], Forumlikeflag.value[t1]);
      Promise.all([resultCollect, resultlike])
        .then(results => {
          for (let k = 0; k < e.length; k++) {
            if (k == 0) {
              if (ForumCollectflag.value.t1 == '已收藏') e[k].collent = true
              else e[k].collent = false
              if (Forumlikeflag.value.t1 == '已点赞') e[k].liked = true
              else e[k].liked = false
            }
            if (k == 1) {
              if (ForumCollectflag.value.t2 == '已收藏') e[k].collent = true
              else e[k].collent = false
              if (Forumlikeflag.value.t2 == '已点赞') e[k].liked = true
              else e[k].liked = false
            }
            if (k == 2) {
              if (ForumCollectflag.value.t3 == '已收藏') e[k].collent = true
              else e[k].collent = false
              if (Forumlikeflag.value.t3 == '已点赞') e[k].liked = true
              else e[k].liked = false
            }
            if (k == 3) {
              if (ForumCollectflag.value.t4 == '已收藏') e[k].collent = true
              else e[k].collent = false
              if (Forumlikeflag.value.t4 == '已点赞') e[k].liked = true
              else e[k].liked = false
            }
            if (k == 4) {
              if (ForumCollectflag.value.t5 == '已收藏') e[k].collent = true
              else e[k].collent = false
              if (Forumlikeflag.value.t5 == '已点赞') e[k].liked = true
              else e[k].liked = false
            }
            if (k == 5) {
              if (ForumCollectflag.value.t6 == '已收藏') e[k].collent = true
              else e[k].collent = false
              if (Forumlikeflag.value.t6 == '已点赞') e[k].liked = true
              else e[k].liked = false
            }
            if (k == 6) {
              if (ForumCollectflag.value.t7 == '已收藏') e[k].collent = true
              else e[k].collent = false
              if (Forumlikeflag.value.t7 == '已点赞') e[k].liked = true
              else e[k].liked = false
            }
            if (k == 7) {
              if (ForumCollectflag.value.t8 == '已收藏') e[k].collent = true
              else e[k].collent = false
              if (Forumlikeflag.value.t8 == '已点赞') e[k].liked = true
              else e[k].liked = false
            }
          }

        })
        .catch(error => {
        });
      allrealylist.value = e
      console.log('allrealylist.value', allrealylist.value);
    }
  }
  async function DeleteMycomment (id) {
    let result = await repDeleteMycomment(id, token);
    if (result.code == 200) {
      ElMessage.success('删除成功！')
    }
    else {
      ElMessage.error('删除失败！')
    }

  }
  function ClassisAll () {
    searchList.value = forumList.value
    // searchList.value = result.data;
  }

  return {
    getForumList,
    getList,
    forumList,
    changecollect,
    changelike,
    getSearchList,
    searchtext,
    searchList,
    AddForum,
    addforumlist,
    getmyForumList,
    forumaddshow,
    myforum,
    myForumCollectList,
    getmyForumCollectList,
    getForumCommenttList,
    ForumCommenttList,
    pushForumComment,
    DeleteForumcollect,
    DeleteForumlike,
    DeleteMyForum,
    getForumCollectflag,
    ForumCollectflag,
    Forumlikeflag,
    getForumlikeflag,
    getClassForumList,
    gethotForumList,
    hotForumList,
    Forumlikedcollect,
    ClassisAll,
    AddChangeMyForumList,
    isAlllist,
    DeleteMycomment

  }

}

)





