<template>
  <div class="headr">
    <div class="logo" @click=" $router.push('/news')"><img src="./image/logo.png" alt=""></div>
    <Search v-if="searchshow()" class="search"></Search>
    <el-menu class="el-menu-demo" mode="horizontal" :id="head">
      <el-sub-menu index="5" class="userimg">
        <template #title><img :src="userimg" alt=""></template>
        <el-menu-item index="2-1" @click="userinfo" v-if="loginflag" class="elmenuitem">我的资料</el-menu-item>
        <el-menu-item index="2-2" @click="gologin()" v-if="!loginflag" class="elmenuitem">去登录</el-menu-item>
        <el-menu-item index="2-3" @click="deletelogin()" v-if="loginflag" class="elmenuitem">退出登录</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="1" @click="fankui"><img src="./image/fankui.png" alt=""
          style="width:20px">反馈中心</el-menu-item>
      <el-menu-item index="2" style="40px" disabled><img src="./image/xiuli.png" alt="" style="width:30px">
        处理中心
      </el-menu-item>
      <el-menu-item index="3" style="40px" disabled><img src="./image/gongju.png" alt="" style="width:20px">
        实用工具
      </el-menu-item>

    </el-menu>

  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Search from '@/pages/Home/Head/Search/Search.vue'
import { usermain } from '@/store/index'
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const $router = useRouter()
name: 'Headr'

let navshow = ref(true);
let searchtext = ref("");
let loginflag = ref(localStorage.getItem("huixiao"))
const store = usermain();
const userimg = ref(require('./image/neutral.png'))
addEventListener('resize', () => {

})


let head = ref();
const handleScroll = () => {
  let scrollTop = document.documentElement.scrollTop;
  if (scrollTop == 0) {
    head.value = "head1"
  } else {
    head.value = "head2"
  }
}
const userinfo = () => {
  // 滚动条宽度
  let scrollWidth = window.innerWidth - document.documentElement.offsetWidth;
  console.log(scrollWidth);
  // document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = scrollWidth + 'px';
  $router.push('/userinfo')
}
const gologin = () => {
  $router.push('/login')
}
const deletelogin = () => {
  localStorage.removeItem("huixiao");
  location.reload()
}
const fankui = () => {
  $router.push('/fankui')
}
const getuserimg = async () => {
  const store = usermain();
  if (loginflag.value) {
    await store.getuserinfo().then(() => {
      userimg.value = store.userinfo.userAvatar
    })
  }
  else {
    userimg.value = require('./image/neutral.png')
  }
}
onMounted(async () => {
  window.addEventListener('scroll', handleScroll, true)
  getuserimg()
})
const searchshow = () => {
  if ($router.currentRoute.value.path == '/forum' || $router.currentRoute.value.path == '/news' || $router.currentRoute.value.path == '/shop') {
    return true
  }
  else {
    return false
  }
}
//滚动条防抖

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