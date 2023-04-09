<template>
  <div class="bg">

    <head>
      <meta charset="utf-8">
      <meta name="author" content="Kodinger">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>My Login Page</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>

    <body class="my-login-page">
      <section class="h-100">
        <div class="container h-100">
          <div class="row justify-content-md-center h-100">
            <div class="card-wrapper">
              <div class="brand">
                <img :src="logoimg" alt="logo">

              </div>
              <div class="card fat">
                <div class="card-body">
                  <h4 class="card-title">Login</h4>
                  <form method="POST" class="my-login-validation" novalidate="">
                    <div class="form-group">
                      <label for="email">Student Number</label>
                      <el-input id="studentnumber" @mouseenter="SNlogoenter" @mouseleave="SNlogoleave" type="email"
                        class="forminput" name="studentnumber" v-model="user.studentnumber" maxlength="11" />
                      <div class="invalid-feedback">
                        Email is invalid
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="password">Password
                        <a href="forgot.html" class="float-right">
                          Forgot Password?
                        </a>
                      </label>
                      <el-input id="password" :type='passwordshow?"text":"password"' class="forminput"
                        @mouseenter="PWlogoenter" @mouseleave="PWlogoleave" name="password" v-model="user.password" />
                      <div class="pwshow" @click="passwordshow=!passwordshow" type="button" @mouseenter="PWlogoenter">
                        <img :src="pwshowimg">
                      </div>
                      <div class="invalid-feedback">
                        Password is required
                      </div>
                    </div>

                    <div class="form-group">
                      <el-checkbox type="checkbox" name="remember" id="remember">Remember Me</el-checkbox>
                    </div>
                    <div class="form-group m-0">
                      <el-button type="primary" class="btn btn-primary btn-block" @click="userLogin" :plain="okLogin">
                        Login
                      </el-button>
                    </div>
                    <div class="mt-4 text-center">
                      Don' t have an account? <router-link to="/register"><a href="">Create One</a>
                      </router-link>
                    </div>
                  </form>
                </div>
              </div>
              <div class="footer">
                Copyright &copy; 2023 &mdash; Your Company
              </div>
            </div>
          </div>
        </div>
      </section>
    </body>
  </div>
</template>

<script setup>
  import { ref, reactive, watch } from 'vue';
  import { ElMessage } from 'element-plus';
  import debounce from "@/utils/debounce.js";
  import thorttle from "@/utils/thorttle.js";
  // import router from '@/router'
  import { useRoute, useRouter } from 'vue-router';
  name: 'Login';
  let logoimg = ref(require('@/pages/Login/image/neutral.png'))
  let pwshowimg = ref(require('@/pages/Login/image/pwshow.png'))
  let passwordshow = ref(false)
  let user = reactive({
    studentnumber: '',
    password: ''
  })
  const route = useRoute();
  // console.log(route.query.userphone);
  user.studentnumber = route.query.userphone
  // user.studentnumber = ref(router.params.userphone)
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
  const userLogin = debounce(function () {
    if (1) {
      route.push({ path: "/home", query: { userphone: userinfo.phone } });
      ElMessage.success('登陆成功')
      // console.log(Math.random());
    }
    else {
      ElMessage.error('账号或密码错误')
    }
  }, 500)


</script>

<style scoped lang="scss" src="./Login.scss">
  /* @import url(../Login.scss); */
</style>