<template>
  <div class="Forumbox">
    <button @click="qqq">qwedqweqweqwwwwaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaawwwwwqwe</button>
    <div class="classes">
      <div class="head">
        <div class="title"
             v-for="list in titles"
             :key="list.id">
          <el-tag size="medium">
            <p>{{list.title}}</p>
          </el-tag>
        </div>
      </div>
      <div class="body">
        <div class="left">
          <div class="commentbox"
               v-for="lists in forumlist"
               :key=lists.id>
            <div class="user">
              <img src="./image/neutral.png"
                   alt="">
              <p class="username">{{lists.id}}</p>
            </div>
            <div class="questionbox">
              <p class="question">{{lists.title}}</p>
              <p class="more">{{lists.body}}</p>
              <div class="handle">
                <p @click="opencomment">评论</p>
                <div class="morecomment">
                  <el-input type="textarea"
                            class="youcomment"
                            v-model="comment"
                            maxlength="100"
                            :autosize="{ minRows: 2, maxRows: 4}" />
                  <el-button class="pushcomment"
                             type="primary">发表</el-button>
                  <div class="othercommentbox">
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

        </div>
        <div class="right">
          22
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
let forumlist = reactive([]);
let comment = ref("我我我啊啊啊啊")
const opencomment = () => {

}
const pushcomment = () => {

}
const qqq = () => {
  store.getList();
  forumlist = JSON.parse(JSON.stringify(store.searchList));
  console.log("store.searchList", forumlist[0]);
  forumlist.push({ aa: 1 })
}
onMounted(() => {
  store.getList();
  // const forumStore = JSON.parse(JSON.stringify(store));
  forumlist = JSON.parse(JSON.stringify(store.searchList));
  console.log("store.searchList", forumlist);
})


</script>

<style scoped lang="scss" src="./Forum.scss">
</style>