<template>

  <Head></Head>

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
    <aside>
      <Message />
    </aside>
  </body>
  <footer>
  </footer>
</template>

<script setup>
  // import { components } from 'vue'
  import Head from '@/pages/Home/Head/Head.vue'
  import Nav from '@/pages/Home/Nav/Nav.vue'
  import Message from '@/pages/Home/Message/Message.vue'
  import News from '@/pages/Home/Section/News/News.vue'
  import Forum from '@/pages/Home/Section/Forum/Forum.vue'
  import Shop from '@/pages/Home/Section/Shop/Shop.vue'

  name: 'Home'
  // const app = createApp({})
  // components: {
  //   Navv
  // }
  // let activeIndex = '1';
  // let activeIndex2 = '1';
  // const handleSelect = (key, keyPath) => {
  //   console.log(key, keyPath)
  // }
</script>

<style scoped lang="scss" src='./Home.scss'>

</style>