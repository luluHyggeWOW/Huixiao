<template>
  <div class="main">
    <!-- <div class="title">
      <span>校园大事件</span>
    </div> -->
    <div class="imghot">
      <div class="gdimg">
        <el-carousel trigger="click"
                     height="400px"
                     style="width:600px"
                     ref="showimgindex">
          <el-carousel-item v-for="(list,index) in hotnews"
                            :key="index">

            <div class="hotimgdiv"
                 name="index">
              <img :src="list.evnImg"
                   @click="
                   clcikhotimg(index)">
              <p>{{list.evnTitle}}</p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="hotnews">
        <div class="hotnewstitle">
          <img src="./image/hot.png"
               alt="">
          <p>热点新闻</p>
        </div>
        <div v-for="(list,index) in hotnews"
             :key=index
             @click="clcikhottitle(index)">
          <div class="hotnewstext">
            <div class="biaodian"></div>
            <p>{{list.evnTitle}}</p>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="allnews now">
      <div class="allnewstitle"><img src="./image/new.png"
             alt="">
        <p>实时新闻</p>
      </div>
      <div v-for="(list,index) in nownews"
           :key=index
           class="allnewstext now"
           id="nownews">
        <div class="titlediv"
             @click="alltexthandle(index,'now')">
          <div class="biaodian"></div>
          <p>
            {{list.evnTitle}}</p>
        </div>
        <div class="alldiv alldivadd">
          <div class="alltext">
            <div class="text">
              {{list.evnTest}}
            </div>
          </div>
          <div class="time">
            发布时间：{{list.evnData}}
          </div>
          <div class="packup"
               ref="peckup"
               @click="packuphandle(index,'now')">
            <img src="./image/packup.png"
                 alt="">
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="allnews all">
      <div class="allnewstitle"><img src="./image/all.png"
             alt="">
        <p>所有新闻</p>
      </div>
      <div v-for="(list,index) in allnews"
           :key=index
           class="allnewstext all"
           id="nownews">
        <div class="titlediv"
             @click="alltexthandle(index,'all')">
          <div class="biaodian"></div>
          <p>{{list.evnTitle}}</p>
        </div>
        <div class="alldiv alldivadd">
          <div class="alltext">
            <div class="text">
              {{list.evnTest}}
            </div>
          </div>
          <div class="time">
            发布时间： {{list.evnData}}
          </div>
          <div class="packup"
               @click="packuphandle(index,'all')">
            <img src="./image/packup.png"
                 alt="">
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { defineComponent, ref, reactive, getCurrentInstance, onMounted } from 'vue';
import { getNewsList } from '@/store/news/index'
import '@splidejs/vue-splide/css';
name: 'News'

let hotnews = ref([])
let nownews = ref([])
let allnews = ref([])

const store = getNewsList()
const getallnews = async () => {
  await store.getAllNewsList()
  allnews.value = store.NewsList.AllList
}
const gethotnews = async () => {
  await store.getHotNewsList()
  hotnews.value = store.NewsList.HotList
  console.log(1111, hotnews.value);
}
const getnownews = async () => {
  await store.getNowNewsList()
  nownews.value = store.NewsList.NowList
}
const showimgindex = ref()
const clcikhotimg = (index) => {
  // showimg = index
}
const clcikhottitle = (index) => {
  showimgindex.value.setActiveItem(index)
}
document.getElementsByClassName('hotnewstext')[0]

document.getElementsByClassName('hotnewstext').onmouseover = function name (params) {
  console.log(11);
}
const inhotnewstext = () => {

}
const alltexthandle = (index, val) => {
  let dom = document.getElementsByClassName(`allnewstext ${val}`)[index];
  if (dom.children[1].classList == "alldiv alldivadd") {
    dom.children[1].classList.remove("alldivadd")
    dom.children[0].classList.add('titledivadd')
    dom.children[0].style.color = 'rgb(111, 111, 223)'

  } else {
    dom.children[1].classList.add("alldivadd")
    dom.children[0].classList.remove('titledivadd')
    dom.children[0].style.color = 'black'
  }
}
const packuphandle = (index, val) => {
  let dom = document.getElementsByClassName(`allnewstext ${val}`)[index];
  dom.children[1].classList.add("alldivadd")
  dom.children[0].classList.remove('titledivadd')
  dom.children[0].style.color = 'black'
}
const getmoreNewsList = () => {
  if (document.documentElement.scrollTop + window.innerHeight === document.documentElement.scrollHeight) {
    getallnews();
  }
}
onMounted(() => {
  window.addEventListener('scroll', getmoreNewsList, true)
  getallnews();
  gethotnews();
  getnownews();
})
</script>

<style scoped lang="scss" src="./News.scss">
</style>