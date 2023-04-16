<template>
  <div class="app">
    <header>

      <Head></Head>
    </header>

    <Chat></Chat>


    <body>

      <Nav></Nav>
      <section>
        <div class="title">
          <el-button @click="$router.push('/forum')">学习论坛</el-button>
          <el-button @click="$router.push('/news')">校园大事件</el-button>
          <el-button @click="$router.push('/shop')">二手市场</el-button>
        </div>
      </section>
      <div class="views">
        <router-view />
      </div>

      <div class="mes">
        <Message />
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
  import Footer from '@/pages/Home/Footer/Footer.vue'
  // import News from '@/pages/Home/Section/News/News.vue'
  // import Forum from '@/pages/Home/Section/Forum/Forum.vue'
  // import Shop from '@/pages/Home/Section/Shop/Shop.vue'
  import { components, ref } from 'vue'
  name: 'Home'
  // $('.search')
  const Forumshow = () => {
    console.log($('.Forum'));
    $('.Forum').show()
  }
  const Newsshow = () => {
    console.log($('.News'));
    $('.News').show()
  }
  const Shopshow = () => {
    console.log($('.Shop'));
    $('.Shop').show()
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