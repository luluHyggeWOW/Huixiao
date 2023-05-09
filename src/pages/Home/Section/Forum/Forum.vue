<template>
  <div class="Forumbox">
    <div class="classes">
      <div class="body">
        <div class="left">
          <div class="head">
            <div class="title"
                 v-for="list in titles"
                 :key="list.id">
              <el-tag style="width:auto;height:30px;">
                <p>{{list.title}}</p>
              </el-tag>
            </div>
          </div>
          <div class="commentbox"
               v-for="(list,index) in Forum.allForumlist"
               :key="list.t_id">
            <div class="user">
              <img alt=""
                   :src="list.user_avatar">
              <div class="username">
                <p>{{list.user_name}}</p>
              </div>
            </div>
            <div class="questionbox">
              <p class="question">{{list.t_titile}}</p>
              <div class="more">
                <img :src="list.t_img"
                     alt=""
                     v-if="list.t_img!='' ">
                <span>{{list.t_source}}</span>
              </div>
              <div class="handle">
                <div>
                  <button @click="like(list,index)"
                          class="like"
                          v-if="!list.liked">
                    <p><img src="./image/like0.png"
                           class="likeimg">
                      <span>{{list.t_like_count}}</span>
                    </p>
                  </button>
                  <button @click="deletelike(list,index)"
                          class="like btnadd"
                          v-if="list.liked">
                    <p><img src="./image/like1.png"
                           class="likeimg">
                      <span>{{list.t_like_count}}</span>
                    </p>
                  </button>
                </div>
                <div>
                  <button @click="collect(list,index)"
                          class="collect"
                          v-if="!list.collent">
                    <p>
                      <img src="./image/collect.png"
                           class="collectimg">
                      <span>{{list.t_usc_count}}</span>
                    </p>
                  </button>
                  <button @click="deletecollect(list,index)"
                          class="collect btnadd"
                          v-if="list.collent">
                    <p>
                      <img src="./image/collected.png"
                           class="collectedimg">
                      <span>{{list.t_usc_count}}</span>
                    </p>
                  </button>
                </div>

                <div>
                  <button @click="othercommentshow(list.t_id,index)"
                          class="othercommentshow"
                          ref="othercommentshowdiv">
                    <p><img src="./image/comment.png"
                           class="commentimg"
                           ><span>评论</span></p>
                  </button>
                </div>

              </div>
              <div class="morecomment"
                   >
                <el-input type="textarea"
                          class="youcomment"
                          v-model="comment"
                          maxlength="100"
                          :autosize="{ minRows: 2, maxRows: 4}"
                          placeholder="发表你的评论" />
                <el-button class="pushcomment"
                           type="primary"
                           @click="commentforum(list,index)">评论</el-button>
                <div class="othercommentbox"
                     v-if="othercommentshow"
                    >
                  <div class="othercommentdiv"
                       v-for="(commentlist,i) in Forum.allForumlist[index].comment"
                       :key="i" @mouseenter="deleteothercommentbtn(index,i,'enter',commentlist.tk_uid==userid)" @mouseleave="deleteothercommentbtn(index,i,'leave',commentlist.tk_uid==userid)">
                    <div class="otheruse">
                      <img :src="commentlist.user_avatar"
                           alt="">
                      <p>{{commentlist.tk_source}}</p>
                    </div>
                    <div class="othercomment" >
                      <p>{{commentlist.user_name ?commentlist.user_name:`未命名者${commentlist.tk_uid.slice(0,5)}`}}</p>
                    </div>
                    <div class="deleteothercommentbtn" v-if="commentlist.tk_uid==userid" style="display:none">
                      <el-button type="danger" size="mini" style="width:70px"  @click="deletecomment(commentlist,index,i)"><span>删除评论</span></el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="footerline"></div>
          </div>

        </div>
        <div class="right">
          <div class="creation">
            <div class="title"><img src="./image/creation.png"
                   style="width:32px">
              <p>创作中心</p>
            </div>
            <div class="text">
              <span>开启你的创意之旅</span>
              <p>想说点什么，聊点什么,尽情发表出来吧！</p>
              <img src="./image/bear.png"
                   alt="">
            </div>
            <div class="addbtn"
                 @click="dialogForm">
              <el-button type="primary"
                         style="width:200px; height:50px;font-size:18px; cursor: pointer;"><img src="./image/add.png"
                     alt=""
                     style="width:25px">
                <p>开始创作</p>
              </el-button>
            </div>
          </div>
          <div class="hotforum">
            <div class="title">
              <img src="./image/hot.png"
                   alt="">
              <p>热榜讨论</p>

            </div>
            <div class="hotbox">
              <div class="hotdiv"
                   v-for="(list,index) in hotforum.value"
                   :key="index">
                <p class="top">{{index+1}}</p><span>{{list.evnTitle}}</span>
              </div>
            </div>
            <div :class="footerclass">
              <p class="p1">联系我们 © 2023 慧校huixiao: )</p>
              <p>支持邮箱：www.1344085034@qq.com</p>
              <p>服务热线：888-888-8888</p>
            </div>
          </div>
        </div>

      </div>
    </div>
    <footer>
    <div class="hrfooter">
      <p>&ndash;&ndash;&ndash;&ndash;&ndash;&ndash;
        我是有底线的
        &ndash;&ndash;&ndash;&ndash;&ndash;&ndash;</p>
    </div>
  </footer>
  </div>
  <Forumadd class="Forumadd"
            v-if="Forumaddshow"></Forumadd>
  
</template>

<script setup>
import { ref, reactive, onMounted, toRaw, computed, watch, resetFields } from 'vue'
import { getForumList } from '@/store/forum/index'
import { usermain } from '@/store/index'
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
import debounce from "@/utils/debounce.js";
import Forumadd from './Forumadd/Forumadd.vue'
import { v4 as uuidv4 } from 'uuid'

name: 'Forum'


let hotforum = reactive([])
let Forum = reactive({
  Forumlist: '',
  allForumlist: '',
  moreForumlist: '',
  nowPage: 1,
});
  const store2=usermain();
// const Forumaddref = ref(null)
let time = ref()
let collected = ref(false)
let comment = ref("")
let footerclass = ref('footer')
const store = getForumList();
const gettime = () => {
  var d = new Date();
  var year = String(d.getFullYear())
  var month = d.getMonth() + 1;
  if (month <= 9) {
    month = `0${month}`
  }
  var day = String(d.getDate());
  if (day <= 9) {
    day = `0${day}`
  }
  time.value = `${year}-${month}-${day}`
}
// const loginflag=ref(localStorage.getItem("huixiao"))
//删除我的评论
const deletecomment= async(list,index,i)=>{
  await store.DeleteMycomment(list.tk_id).then((result)=>{
    document.getElementsByClassName('morecomment')[index].
    getElementsByClassName('othercommentdiv')[i].style.display='none';
  })

}
//收藏
const collect = debounce(async (list, index) => {
  gettime();
  let data = {
    "usc_sid": list.t_id,
    "usc_data": time.value,
    "tk_title": "test"
  }
  await store.changecollect(data)
  Forum.allForumlist[index].collent = true
  Forum.allForumlist[index].t_usc_count++
},300)
const deletecollect = debounce(async (list, index) => {
  await store.DeleteForumcollect(list.t_id)
  Forum.allForumlist[index].collent = false
  Forum.allForumlist[index].t_usc_count--
},300)
//喜欢
const like = debounce(async (list, index) => {
  let data = {
    "t_like_tid": list.t_id,
    "t_like_title": "test"
  }
  await store.changelike(data).then(()=>{
  Forum.allForumlist[index].liked = true
  Forum.allForumlist[index].t_like_count++
  })
  
},300)
const deletelike = debounce(async (list, index) => {
  console.log('deletelike');
  await store.DeleteForumlike(list.t_id).then(()=>{
 Forum.allForumlist[index].liked = false
  Forum.allForumlist[index].t_like_count--
  })
 
},300)
const userid=ref('')
const othercommentshowdiv = ref(null)
const ForumCollectLike=ref(1)
//二级评论
const othercommentshow = debounce(async (tid, index) => {
  userid.value=store2.userinfo.userId
  await store.getForumCommenttList(tid);
  let commentlist = [];
  store.ForumCommenttList.forEach(e => {
    commentlist.push({
      tk_data: e.tk_data,
      tk_id: e.tk_id,
      tk_source: e.tk_source,
      tk_tid: e.tk_tid,
      tk_uid: e.tk_uid,
      user_avatar: e.user_avatar,
      user_name: e.user_name
    })
  });
  Forum.allForumlist[index].comment = commentlist
  document.getElementsByClassName('morecomment')[index]
  if (document.getElementsByClassName('morecomment')[index].style.display == "block") {
    document.getElementsByClassName('morecomment')[index].style.display = "none"
    document.getElementsByClassName('othercommentshow')[index].style.backgroundColor = "rgb(232, 247, 252)"
    document.getElementsByClassName('commentimg')[index].src=require('@/pages/Home/Section/Forum/image/comment.png');
      
  } else {
    document.getElementsByClassName('morecomment')[index].style.display = "block"
    document.getElementsByClassName('othercommentshow')[index].style.backgroundColor = "#69b4fe"
    document.getElementsByClassName('commentimg')[index].src=require('@/pages/Home/Section/Forum/image/commented.png')
    
    
  }

},300)
//添加评论
const commentforum = async (list, index) => {
  if(comment.value!=''){
 gettime()
  let uuid = uuidv4()
  uuid = uuid.split("-").join("");
  let data = {
    tk_id: uuid,   //评论id
    tk_tid: list.t_id,    //评论帖子ID
    tk_source: comment.value,   //评论内容
    tk_data: time.value  //发表评论的时间
  }
  await store.pushForumComment(data)
  othercommentshow(list.t_id, index)
  comment.value=''
}
else{
  ElMessage.warning('评论不能为空哦')
}
}
//子评论删除按钮显示
const deleteothercommentbtn=(index,i,val,ismy)=>{
  console.log(ismy);
  if(ismy){
  if(val=='leave'){
    document.getElementsByClassName('morecomment')[index].
    getElementsByClassName('deleteothercommentbtn')[i].style.display='none';
    console.log(index,i);
  }else{
    document.getElementsByClassName('morecomment')[index].
    getElementsByClassName('deleteothercommentbtn')[i].style.display='block';
  }
  }
}
//调整footer

const handleScroll = () => {
  let scrollTop = document.documentElement.scrollTop;
  if (scrollTop >= 820) {
    footerclass.value = "footer footeradd"
  } else {
    footerclass.value = "footer "
  }
}

const getmoreForumList = () => {
  if (document.documentElement.scrollTop + window.innerHeight === document.documentElement.scrollHeight) {
    if (store.isAlllist) {
      getAllList();
    }

  }
}
let Forumaddshow = ref(store.forumaddshow)
const dialogForm = () => {
  store.forumaddshow = true
}
const gethotForumList=async()=>{
  await store.gethotForumList()
  hotforum.value=store.hotForumList
}

//监听搜索框
watch([()=>store,()=>store.searchList], (newvalue, oldvalue) => {
  if(newvalue[1]!=oldvalue[1]){
    Forum.allForumlist=store.searchList
    Forum.nowPage=1;
    console.log(Forum.allForumlist);
  }


})

const getAllList= async()=>{
  await store.getList();
  Forum.allForumlist = store.forumList;
  console.log('Forum.allForumlist',Forum.allForumlist);
    Forum.allForumlist = [...Forum.allForumlist]
    
}
watch(() => store.forumaddshow, (newvalue, oldvalue) => {
  Forumaddshow.value = newvalue
  // Shopaddshow.value = newvalue[0]
})

onMounted(async () => {
  window.addEventListener('scroll', handleScroll, true)
  // window.addEventListener('scroll', lazyloading, true)
  window.addEventListener('scroll', getmoreForumList, true)
  gethotForumList()
  getAllList()
})
// beforeRouteEnter(async () => {
 
// })




</script>

<style scoped lang="scss" src="./Forum.scss">
</style>