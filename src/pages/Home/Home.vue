<template>
  <div class="app" ref="screen">
    <header>

      <Head></Head>
    </header>

    <body>
      <Nav></Nav>
      <section>
        <div class="title">
          <div class="forumbtn" @click="Forumshow">
            <span class="bigtitle">学习论坛</span>
            <span class="smalltitle">可以与他人交流讨论</span>
            <img src="./image/forum.png" alt="">
          </div>
          <div class="newsmbtn" @click="Newsshow">
            <span class="bigtitle">校园事件</span>
            <span class="smalltitle">可以观察校园实时事件</span>
            <img src="./image/news.png" alt="">
          </div>
          <div class="shopbtn" @click="Shopshow">
            <span class="bigtitle">二手市场</span>
            <span class="smalltitle">可以买卖闲置好物</span>
            <img src="./image/shop.png" alt="">
          </div>
        </div>
      </section>
      <div class="views">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
      <div class="mes">
        <Message />
      </div>
      <div class="windons">
      </div>
      <div class="gotop" @click="gotop">
        <img src="./image/gotop.png" alt="">
      </div>
      <div>

      </div>
    </body>

  </div>

</template>

<script setup>
import Head from '@/pages/Home/Head/Head.vue'
import Nav from '@/pages/Home/Nav/Nav.vue'
import Message from '@/pages/Home/Message/Message.vue'
import Footer from '@/pages/Home/Footer/Footer.vue'
import Shopadd from '@/pages/Home/Section/Shop/Shopadd/Shopadd.vue'
import Forumadd from '@/pages/Home/Section/Forum/Forumadd/Forumadd.vue'
import { components, ref, router, watch, onMounted } from 'vue'
import { useRoute, useRouter } from "vue-router"

name: 'Home'
const route = useRoute()
const $router = useRouter()
let screen = ref()
const Forumshow = () => {
  $router.push('/forum')
}
const Newsshow = () => {

  $router.push('/news')
}
const Shopshow = () => {

  $router.push('/shop')
}
const gotop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
//滚动条防抖
window.onload = function () {
  // 将滚动位置回到顶部
  window.scrollTo(0, 0);
}



</script>

<style scoped lang="scss" src='./Home.scss'>
</style>
<style lang="scss">
div img {
  border-radius: 15px;
}

html {
  padding: 0;
  margin: 0;
  .section {
    .title {
      div {
      }
    }
  }
}
</style>