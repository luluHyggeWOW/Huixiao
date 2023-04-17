<template>
  <div class="hide">
  </div>
  <div class="app">
    <header>

      <Head></Head>
    </header>

    <Chat></Chat>

    <body>

      <Nav></Nav>
      <section>
        <div class="title">
          <div class="forumbtn"
               @click="Forumshow"><span>学习论坛</span></div>
          <div class="newsmbtn"
               @click="Newsshow"><span>校园大事件</span></div>
          <div class="shopbtn"
               @click="Shopshow"><span>二手市场</span></div>
        </div>
      </section>
      <div class="views">
        <router-view />
      </div>
      <div class="mes">
        <Message />
      </div>
      <div class="Friendmes">
        <FriendMessage />
      </div>
      <div class="windons">
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
import Chat from '@/pages/Home/Chat/Chat.vue'
import Message from '@/pages/Home/Message/Message.vue'
import FriendMessage from '@/pages/Home/Message/FriendMessage/FriendMessage.vue'
import Footer from '@/pages/Home/Footer/Footer.vue'

import { components, ref, router } from 'vue'
import { useRoute, useRouter } from "vue-router"

name: 'Home'
const route = useRoute()
const $router = useRouter()

const Forumshow = () => {
  console.log(this);
  $router.push('/forum')
}
const Newsshow = () => {

  $router.push('/news')
}
const Shopshow = () => {

  $router.push('/shop')
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
}
</style>