<template>
  <div class="Forumbox">
    <div class="classes">

      <div class="body">
        <div class="left">
          <div class="head">
            <div class="title"
                 v-for="list in titles"
                 :key="list.id">
              <el-tag size="medium"
                      style="width:auto;height:30px;">
                <p>{{list.title}}</p>
              </el-tag>
            </div>
          </div>
          <div class="commentbox">
            <!-- v-for="lists in forumlist"
               :key=lists.id -->
            <div class="user">
              <img src="./image/neutral.png"
                   alt="">
              <p class="username">呜呜呜</p>
            </div>
            <div class="questionbox">
              <p class="question">为甚买买买嗷嗷</p>
              <p class="more">阿萨德群奥所大所多大青蛙多群无多群无大所多1大东区多群阿萨德群奥所大所多大青蛙多群无多群无大所多1大东区多群阿萨德群奥所大所多大青蛙多群无多群无大所多1大东区多群阿萨德群奥所大所多大青蛙多群无多群无大所多1大东区多群阿萨德群奥所大所多大青蛙多群无多群无大所多1大东区多群阿萨德群奥所大所多大青蛙多群无多群无大所多1大东区多群阿萨德群奥所大所多大青蛙多群无多群无大所多1大东区多群阿萨德群奥所大所多大青蛙多群无多群无大所多1大东区多群阿萨德群奥所大所多大青蛙多群无多群无大所多1大东区多群阿萨德群奥所大所多大青蛙多群无多群无大所多1大东区多群阿萨德群奥所大所多大青蛙多群无多群无大所多1大东区多群</p>
              <div class="handle">
                <div>
                  <button @click="like()"
                          class="like">
                    <p><img src="./image/like.png"
                           class="likeimg">
                      <span>赞</span>
                    </p>
                  </button>
                </div>
                <div>
                  <button @click="othercommentshow=!othercommentshow"
                          class="othercommentshow">
                    <p><img src="./image/comment.png"
                           class="commentimg"
                           alt=""><span>评论</span></p>
                  </button>
                </div>

              </div>
              <div class="morecomment">
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
            <div class="addbtn">
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
            <div :class="footerclass">
              <p>联系我们 © 2023 青钢影007LT</p>
              <p>举报邮箱：jubao龙涛@www.com</p>
              <p>服务热线：888-888-8888</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>

    </div>
  </div>

</template>

<script setup>
import { ref, reactive, onMounted, toRaw } from 'vue'
import { getForumList } from '@/store/forum/index'

const store = getForumList();

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
let forumlist = reactive([]);
let comment = ref("我我我啊啊啊啊")
let othercommentshow = ref(false)
let footerclass = ref('footer')
const like = () => {
  console.log(this);
  if (1)
    document.getElementsByClassName("like")[0].style.backgroundColor = "#409EFF"
  // document.getElementsByClassName("likeimg")[0].src = "./image/liked.png"
  else {
    document.getElementsByClassName("like")[0].style.backgroundColor = "rgb(232, 247, 252);"
  }

}
const opencomment = () => {
  othercommentshow.value = !othercommentshow.value
}
const pushcomment = () => {

}
// const qqq = () => {
//   store.getList();
//   forumlist = JSON.parse(JSON.stringify(store.searchList));
//   console.log("store.searchList", forumlist[0]);
//   forumlist.push({ aa: 1 })
// }
// onMounted(() => {
//   store.getList();
//   // const forumStore = JSON.parse(JSON.stringify(store));
//   forumlist = JSON.parse(JSON.stringify(store.searchList));
//   console.log("store.searchList", forumlist);
// })

//调整footer
const handleScroll = () => {
  let scrollTop = document.documentElement.scrollTop;
  if (scrollTop >= 800) {
    footerclass.value = "footer footeradd"
  } else {
    footerclass.value = "footer"
  }
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll, true)

})

</script>

<style scoped lang="scss" src="./Forum.scss">
</style>