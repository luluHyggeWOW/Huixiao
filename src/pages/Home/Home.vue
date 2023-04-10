<template>
  <div class="app">
    <header>

      <Head></Head>
    </header>

    <body>
      <Nav></Nav>
      <section>
        <div class="title">
          <div>学习论坛</div>
          <div>校园大事件</div>
          <div>二手市场</div>
        </div>
        <News></News>
        <Forum></Forum>
        <Shop></Shop>
      </section>
      <div class="mes">
        <Message />
      </div>

    </body>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>

<script setup>

  import Head from '@/pages/Home/Head/Head.vue'
  import Nav from '@/pages/Home/Nav/Nav.vue'
  import Message from '@/pages/Home/Message/Message.vue'
  import Footer from '@/pages/Home/Footer/Footer.vue'
  import News from '@/pages/Home/Section/News/News.vue'
  import Forum from '@/pages/Home/Section/Forum/Forum.vue'
  import Shop from '@/pages/Home/Section/Shop/Shop.vue'
  import { components, ref } from 'vue'
  name: 'Home'
  // $('.search')

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