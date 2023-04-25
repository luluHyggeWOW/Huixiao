<template>
  <div class="bg">

    <body class="my-login-page">
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
              <label for="email">Student Number</label>
              <el-input @mouseenter="SNlogoenter"
                        @mouseleave="SNlogoleave"
                        type="email"
                        class="forminput"
                        name="cellphone"
                        v-model="userinfo.cellphone"
                        maxlength="11"
                        width="200px" />
              <div class="invalid-feedback">
                Email is invalid
              </div>
            </div>

            <div class="form-group">
              <label for="password">Password
                <a href="forgot.html"
                   class="float-right">
                  Forgot Password?
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
                Password is required
              </div>
            </div>

            <div class="form-group">
              <el-checkbox type="checkbox"
                           name="remember"
                           id="remember">Remember Me</el-checkbox>
            </div>
            <el-button type="primary"
                       class="btn btn-primary btn-block"
                       @click="userLogin"
                       :plain="okLogin"
                       style="width: 200px; margin-left:150px">
              Login
            </el-button>
            <div class="text-center">
              Don' t have an account? <router-link to="/register"><a href="">Create One</a>
              </router-link>
            </div>
          </form>
        </div>
        <div class="footer">
          Copyright &copy; 2023 &mdash; Your Company
        </div>
      </div>

    </body>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { ElMessage } from 'element-plus';
import debounce from "@/utils/debounce.js";
import thorttle from "@/utils/thorttle.js";
import { useRoute, useRouter } from 'vue-router';
import { submituser } from '@/store/user/index'
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
  store.$patch(state => {
    state.user.cellphone = userinfo.cellphone
    state.user.password = userinfo.password
    console.log(state.user.cellphone, state.user.password);
  })
  await store.loginsubmit()
  console.log(typeof (store.tokenflag));
  if (typeof (store.tokenflag) == 'undefined') {
    ElMessage.error('账号或密码错误')
  }
  else {
    ElMessage.success('登陆成功')
    localStorage.setItem('huixiao', store.tokenflag.access_token)
    router.push({ path: "/news", query: { userphone: userinfo.cellphone } });
  }
}, 500)


</script>

<style scoped lang="scss" src="./Login.scss">
/* @import url(../Login.scss); */
</style>