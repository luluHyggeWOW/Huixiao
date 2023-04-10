<template>
  <headr>
    <el-menu class="el-menu-demo" mode="horizontal" id="head1">
      <div class="search">
        <input type="text" v-model="searchtext">
        <!-- <button>搜索</button> -->
        <div class="btn">
          <img src="./image/find.png" alt="">
        </div>
      </div>
      <div class="searchlist">searchlistsearchlist</div>
      <!-- <Search></Search> -->
      <el-sub-menu index="5" class="userimg">
        <template #title><img src="./image/neutral.png" alt=""></template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-sub-menu index="2">
        <template #title>我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4">订单管理</el-menu-item>

    </el-menu>

  </headr>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import Search from '@/pages/Home/Head/Search/Search.vue'
  // import axios from 'axios'
  name: 'Headr'
  let navshow = ref(true);
  let searchtext = ref("");
  console.log(window.innerHeight);
  addEventListener('resize', () => {
    // if (window.innerWidth <= 1400) {
    //   navshow.value = false
    // } else {
    //   navshow.value = true
    // }
  })
  $(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    if (scrollTop == 0) {
      $('#head2').attr('id', 'head1')
    } else {
      $('#head1').attr('id', 'head2')
    }

  })
  onMounted(() => {
    this.getData();
  })
  let getData = () => {
    this.$ajax({
      method: 'get',
      url: `/home/page/1/10`
    }).then(res => {

    }).catch(error => {
      console.log(error);
    })
  }


</script>

<style scoped lang="scss" src='./Head.scss'>

</style>
<style>
  .userimg {
    width: 90px;
  }

  .userimg svg {
    display: none;
  }
</style>