<template>
  <div class="hide">
  </div>
  <div class="app">
    <header>

      <Head></Head>
    </header>

    <body>

      <Nav></Nav>
      <section>
        <div class="title">
          <div class="forumbtn"
               @click="Forumshow"><span class="bigtitle">学习论坛</span>
            <span class="smalltitle">可以与他人交流讨论</span>
            <img src="./image/forum.png"
                 alt="">
          </div>
          <div class="newsmbtn"
               @click="Newsshow">
            <span class="bigtitle">校园事件</span>
            <span class="smalltitle">可以观察校园实时事件</span>
            <img src="./image/news.png"
                 alt="">
          </div>
          <div class="shopbtn"
               @click="Shopshow"><span class="bigtitle">二手市场</span>
            <span class="smalltitle">可以买卖闲置好物</span>
            <img src="./image/shop.png"
                 alt="">
          </div>
        </div>
      </section>
      <div class="views">
        <router-view />
      </div>
      <div class="mes">
        <Message />
      </div>
      <div class="Chat">
        <Chat />
      </div>
      <div class="windons">
      </div>
      <div class="gotop"
           @click="gotop">
        <img src="./image/gotop.png"
             alt="">
      </div>
    </body>

    <footer>
      <!-- <Footer></Footer> -->
    </footer>

  </div>
</template>

<script setup>
import Head from '@/pages/Home/Head/Head.vue'
import Nav from '@/pages/Home/Nav/Nav.vue'
import Message from '@/pages/Home/Message/Message.vue'
import Chat from '@/pages/Home/Message/Chat/Chat.vue'
import Footer from '@/pages/Home/Footer/Footer.vue'

import { components, ref, router, watch } from 'vue'
import { useRoute, useRouter } from "vue-router"

name: 'Home'
const route = useRoute()
const $router = useRouter()

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
}
</style>