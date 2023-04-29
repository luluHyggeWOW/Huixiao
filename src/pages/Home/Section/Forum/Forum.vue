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
               v-for="(list,index) in Forum.Forumlist"
               :key="list.t_id">
            <div class="user">
              <img alt=""
                   :src="list.t_img">
              <p class="username">{{list.t_uid}}</p>
            </div>
            <div class="questionbox">
              <p class="question">{{list.t_source}}</p>
              <div class="more">
                <img :src="list.t_img"
                     alt=""
                     v-if="list.t_img!='' ">
                <span>{{list.t_date}}</span>
              </div>
              <div class="handle">
                <div>
                  <button @click="like(list)"
                          class="like">

                    <p><img src="./image/like0.png"
                           class="likeimg">
                      <span>{{list.t_like_count}}</span>
                    </p>
                  </button>
                </div>
                <div>
                  <button @click="othercommentshow(list,index)"
                          class="othercommentshow"
                          ref="othercommentshowdiv">
                    <p><img src="./image/comment.png"
                           class="commentimg"
                           alt=""><span>评论</span></p>
                  </button>
                </div>

              </div>
              <div class="morecomment"
                   ref="morecomment">
                <el-input type="textarea"
                          class="youcomment"
                          v-model="comment"
                          maxlength="100"
                          :autosize="{ minRows: 2, maxRows: 4}" />
                <el-button class="pushcomment"
                           type="primary">发表</el-button>
                <div class="othercommentbox"
                     v-if="othercommentshow">
                  <div class="othercommentdiv">
                    <div class="otheruse">
                      <img src="./image/neutral.png"
                           alt="">
                      <p>我是帅哥是是是</p>
                    </div>
                    <div class="othercomment">
                      <p>为什么呜呜呜 呜呜呜为什么呜呜呜 呜呜呜 为什么呜呜呜 呜呜呜为什么呜呜呜 呜呜呜为什么呜呜呜 呜呜呜为什</p>
                    </div>
                  </div>
                  <div class="othercommentdiv">
                    <div class="otheruse">
                      <img src="./image/neutral.png"
                           alt="">
                      <p>我是帅哥是是是</p>
                    </div>
                    <div class="othercomment">
                      <p>为什么呜呜呜 呜呜呜为什么呜呜呜 呜呜呜 为什么呜呜呜 呜呜呜为什么呜呜呜 呜呜呜为什么呜呜呜 呜呜呜为什</p>
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
            <div class="title"><img src="./image/creation.png">
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
                         style="width:200px; height:50px;font-size:18px"><img src="./image/add.png"
                     alt=""
                     style="width:25px">开始创作</el-button>
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
                   v-for="(list,index) in hotforum"
                   :key="index">
                <p class="top">{{index+1}}</p><span>{{list.title}}</span>
              </div>
            </div>
            <div :class="
                           footerclass">
              <p>联系我们 © 2023 青钢影007LT</p>
              <p>举报邮箱：jubao龙涛@www.com</p>
              <p>服务热线：888-888-8888</p>
            </div>
          </div>
        </div>
        <Forumadd class="Forumadd"
                  v-if="dialogFormVisible"></Forumadd>
      </div>
    </div>
    <div>

    </div>
  </div>

</template>

<script setup>
import { ref, reactive, onMounted, toRaw, computed, watch, resetFields } from 'vue'
import { getForumList } from '@/store/forum/index'
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
import Forumadd from './Forumadd/Forumadd.vue'


name: 'Forum'

let titles = reactive([
  {
    id: 1,
    title: "高数",
  },
  {
    id: 2,
    title: "英语",
  },
  {
    id: 3,
    title: "线性代数",
  }
  ,
  {
    id: 4,
    title: "体育",
  }
  ,
  {
    id: 5,
    title: "形势与政策",
  }

])
let hotforum = reactive([
  {
    id: 1,
    title: "七国集团外长会反对中国试图以七国集团外长会反对中国试图以",
    likeed: false,
  },
  {
    id: 2,
    title: "同事的工资是自己的 2-3 倍,事的工资是自己的 2-3 倍",
    likeed: false,
  }
  ,
  {
    id: 3,
    title: "多城今年首次冲上 30℃",
    likeed: false,
  }
  ,
  {
    id: 4,
    title: "七国集团外长会反对中国试图以武力单方面改变台海现状",
    likeed: false,
  }
  ,
  {
    id: 5,
    title: "为什么在《原神》游戏中升级等级到 80 就不建议再升到 90 呢？",
    likeed: false,
  }
])
let Forum = reactive({
  Forumlist: '',
  allForumlist: '',
  moreForumlist: '',
  nowPage: 1,
});
let dialogFormVisible = ref(false);
// const Forumaddref = ref(null)

let comment = ref("我我我啊啊啊啊")
let footerclass = ref('footer')
const store = getForumList();
async function like (list) {
  console.log(list);
  var d = new Date();
  var year = String(d.getFullYear())
  var month = d.getMonth() + 1;
  if (month <= 9) {
    month = `0${month}`
  }
  var day = String(d.getDate());
  let time = year + month + day
  let data = JSON.stringify({
    "like_sid": list.t_id,
    "like_uid": list.t_uid,
    "like_data": time
  })
  await store.changelike(data)

  if (1)
    document.getElementsByClassName("like")[0].style.backgroundColor = "#409EFF"
  // document.getElementsByClassName("likeimg")[0].src = "./image/liked.png"
  else {
    document.getElementsByClassName("like")[0].style.backgroundColor = "rgb(232, 247, 252);"
  }
}

const morecomment = ref(null);
const othercommentshowdiv = ref(null)
//二级评论
function othercommentshow (list, index) {
  console.log();
  if (morecomment.value[index].style.display == "block") {
    morecomment.value[index].style.display = "none"
    othercommentshowdiv.value[index].style.backgroundColor = "rgb(232, 247, 252)"
  } else {
    morecomment.value[index].style.display = "block"
    othercommentshowdiv.value[index].style.backgroundColor = "#409EFF"
  }

}
//鼠标移入移出
const opencomment = () => {
  othercommentshow.value = !othercommentshow.value
}
const pushcomment = () => {

}
//调整footer

const handleScroll = () => {
  let scrollTop = document.documentElement.scrollTop;
  if (scrollTop >= 820) {
    footerclass.value = "footeradd"
  } else {
    footerclass.value = "footer"
  }
}
//懒加载

const lazyloading = () => {
  let scrollTop = document.documentElement.scrollTop;
  if (scrollTop >= Forum.nowPage * 1500) {
    Forum.nowPage++;
    if (Forum.nowPage * 10 >= Forum.allForumlist.length) {
      Forum.Forumlist = Forum.allForumlist
    }
    else {
      Forum.Forumlist = Forum.allForumlist.slice(0, 10 * Forum.nowPage)
    }
  }
}
const dialogForm = () => {
  const store = getForumList();
  store.forumaddshow = true
  dialogFormVisible.value = true
}
//监听搜索框
watch(store, (newvalue, oldvalue) => {
  if (dialogFormVisible) {
    if (store.searchtext != '') {
      Forum.Forumlist = toRaw(newvalue.searchList)
    }
    else {
      Forum.Forumlist = toRaw(store.forumList)
    }
  }
  dialogFormVisible.value = store.forumaddshow

})


onMounted(async () => {
  window.addEventListener('scroll', handleScroll, true)
  window.addEventListener('scroll', lazyloading, true)

  await store.getList()
  store.forumsList
  const { forumList } = storeToRefs(store)

  //懒加载判断
  if (toRaw(forumList.value).length <= 10) {
    Forum.Forumlist = toRaw(forumList.value);
    Forum.moreForumlist = false
  }
  else {
    Forum.Forumlist = toRaw(forumList.value).slice(0, 10);
    Forum.allForumlist = toRaw(forumList.value);
    Forum.moreForumlist = true
  }
})




</script>

<style scoped lang="scss" src="./Forum.scss">
</style>