<template>
  <div class="bg">

    <body class="my-login-page">
      <div class="logo"><img src="./image/logo.png"
             alt=""></div>
      <div class="box">

        <div class="brand">
          <img :src="logoimg"
               alt="logo">
        </div>
        <div class="card-body">
          <h4 class="card-title">Login</h4>
          <form class="my-login-validation"
                novalidate="">
            <div class="form-group">
              <label for="email">手机号</label>
              <el-input @mouseenter="SNlogoenter"
                        @mouseleave="SNlogoleave"
                        :controls=false
                        class="forminput"
                        name="cellphone"
                        v-model.number="userinfo.cellphone"
                        maxlength="11"
                        width="200px" />
              <div class="invalid-feedback">
                &nbsp;
              </div>
            </div>

            <div class="form-group">
              <label for="password">密码
                <a href="forgot.html"
                   class="float-right">
                </a>
              </label>
              <el-input id="password"
                        :type='passwordshow?"text":"password"'
                        class="forminput"
                        @mouseenter="PWlogoenter"
                        @mouseleave="PWlogoleave"
                        name="password"
                        v-model="userinfo.password"
                        @keyup.enter="userLogin" />
              <div class="pwshow"
                   @click="passwordshow=!passwordshow"
                   type="button"
                   @mouseenter="PWlogoenter">
                <img :src="pwshowimg">
              </div>
              <div class="invalid-feedback">
                &nbsp;
              </div>
            </div>

            <div class="form-group">
              &nbsp;
              <!-- <el-checkbox type="checkbox"
                           name="remember"
                           id="remember"></el-checkbox> -->
            </div>
            <el-button type="primary"
                       class="btn btn-primary btn-block"
                       @click="userLogin"
                       :plain="okLogin"
                       style="width: 200px; margin-left:150px;">
              登录
            </el-button>
            <div class="text-center">
              没有账户？<router-link to="/register"><a href="">点击注册</a>
              </router-link>
            </div>
            <div class="text-center changepassword">
              <router-link to="/forgetpassword"><a href="">忘记密码</a>
              </router-link>
            </div>
          </form>
        </div>
        <div class="footer">
          2023 &mdash;&copy; Huixiao
          <!-- Copyright &copy; 2023 &mdash; -->
        </div>
      </div>

    </body>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import debounce from "@/utils/debounce.js";
import thorttle from "@/utils/thorttle.js";
import { useRoute, useRouter } from 'vue-router';
import { submituser } from '@/store/user/index'
import { usermain } from '@/store/index'
import axios from 'axios';

name: 'Login';
let logoimg = ref(require('@/pages/Login/image/neutral.png'))
let pwshowimg = ref(require('@/pages/Login/image/pwshow.png'))
let passwordshow = ref(false)
let userinfo = reactive({
  cellphone: '',
  password: ''
})
const route = useRoute();
const router = useRouter();
userinfo.cellphone = route.query.userphone
let okLogin = ref(false);
//鼠标悬停input logo变换

const SNlogoenter = () => {
  if (!passwordshow.value) {
    logoimg.value = require('@/pages/Login/image/ecstatic.png')
  }

}
const SNlogoleave = () => {
  if (!passwordshow.value) {
    logoimg.value = require('@/pages/Login/image/neutral.png')
  }
}
const PWlogoenter = () => {
  if (!passwordshow.value) {
    logoimg.value = require('@/pages/Login/image/peek.png')
  }
}

const PWlogoleave = () => {
  if (!passwordshow.value) {
    logoimg.value = require('@/pages/Login/image/neutral.png')
  }
}

//密码显示与隐藏
watch([passwordshow], () => {
  if (!passwordshow.value) {
    pwshowimg = ref(require('@/pages/Login/image/pwshow.png'))
    logoimg.value = require('@/pages/Login/image/peek.png')
  }
  else {
    pwshowimg = ref(require('@/pages/Login/image/pwnoshow.png'))
    logoimg.value = require('@/pages/Login/image/shy.png')
  }
})

//节流
//点击登录
const store = submituser();
const userLogin = debounce(async function () {
  let data = new window.FormData();
  data.append('username', `{"password":${userinfo.password},"authType":"password","cellphone":${userinfo.cellphone}}`);
  await store.loginsubmit(data)

}, 500)
onMounted(() => {

})

</script>

<style scoped lang="scss" src="./Login.scss">
/* @import url(../Login.scss); */
</style>