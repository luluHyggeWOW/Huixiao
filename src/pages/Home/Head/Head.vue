<template>
  <headr>
    <el-menu class="el-menu-demo" mode="horizontal">
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
      <el-sub-menu index="5" class="userimg">
        <template #title><img src="./image/neutral.png" alt=""></template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-sub-menu>
    </el-menu>
    <div class="search" v-if="navshow">
      <input type="text">
      <button>搜索</button>
    </div>
  </headr>
</template>

<script setup>
  import { ref } from 'vue'
  name: 'Headr'
  let navshow = ref(true);
  addEventListener('resize', () => {
    if (window.innerWidth <= 1400) {
      navshow.value = false
    } else {
      navshow.value = true
    }
  })
</script>

<style scoped lang="scss" src='./Head.scss'>

</style>
<style>
  .el-menu-demo {
    display: flex;
    justify-content: right;
    padding: 0px;
    margin: -10px;
  }

  .userimg {
    width: 90px;
  }

  .userimg svg {
    display: none;
  }
</style>