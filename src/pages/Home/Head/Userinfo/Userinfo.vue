<template>

  <div class="box">
    <div class="top">
      <img src="./image/neutral.png"
           alt="">
      <p @click="qq">奥术大师多群</p>

    </div>
    <div class="title">
      <el-tabs type="border-card"
               @tab-click="basicbtn"
               :stretch='true'>
        <el-tab-pane label="基础信息"
                     name="basic"> <span></span></el-tab-pane>
        <el-tab-pane label="教育信息"
                     name="school"></el-tab-pane>
        <el-tab-pane label="爱好信息"
                     name="basic1"></el-tab-pane>
        <el-tab-pane label="其他信息"
                     name="basic2"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="body">

      <router-view />
    </div>
  </div>

</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from "vue-router";
name: 'Userinfo'
const route = useRoute();
const $router = useRouter();
const basicbtn = (tab, event) => {
  if (tab.props.name == 'basic') {
    $router.push('/userinfo/basic')
  }
  else if (tab.props.name == 'school') {
    $router.push('/userinfo/school')
  }
  else {

  }
  // if ()

}


</script>

<style scoped lang="scss" src="./Userinfo.scss">
</style>