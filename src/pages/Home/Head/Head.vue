<template>
  <div class="headr">
    <el-menu class="el-menu-demo"
             mode="horizontal"
             :id="head">

      <Search></Search>

      <el-sub-menu index="5"
                   class="userimg">
        <template #title><img src="./image/neutral.png"
               alt=""></template>
        <el-menu-item index="2-1"
                      @click="userinfo">我的资料</el-menu-item>
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
      <el-menu-item index="4">联系我们</el-menu-item>

    </el-menu>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Search from '@/pages/Home/Head/Search/Search.vue'
// import { requests } from "@/api/request"
// import axios from 'axios'
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const $router = useRouter()
name: 'Headr'
// const Login = async () => {
//   await requests({ url: `/study_talk/search_source?source=ce`, method: 'get' }).then(
//     res => {
//       console.log(res.data)
//       if (res.status == 200) {
//         console.log(res.data)
//       } else {
//         ElMessage.error('账号或者密码错误！！')
//       }
//     })
// }
let navshow = ref(true);
let searchtext = ref("");
// console.log(window.innerHeight);
addEventListener('resize', () => {
  // if (window.innerWidth <= 1400) {
  //   navshow.value = false
  // } else {
  //   navshow.value = true
  // }
})

// document.getElementsByClassName('el-menu-demo')[0].scrollTop

// $(window).scroll(function () {
//   var scrollTop = $(this).scrollTop();
//   if (scrollTop == 0) {
//     $('#head2').attr('id', 'head1')
//   } else {
//     $('#head1').attr('id', 'head2')
//   }

// })
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
  // this.isShow = !this.isShow;
  // 滚动条宽度
  let scrollWidth = window.innerWidth - document.documentElement.offsetWidth;
  console.log(scrollWidth);
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = scrollWidth + 'px';
  $router.push('/userinfo/basic')
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll, true)

})
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