<template>
  <div class="bg">

    <body class="my-login-page">
      <div class="logo"><img src="./image/logo.png" alt=""></div>

      <div class="box">
        <div class="brand">
          <img src="./image/neutral.png" alt="logo">
          <img src="./image/Message2.png" alt="" class="message" v-if="correct.messageflag">
        </div>
        <div class="card-body">
          <h4 class="card-title">Register</h4>
          <form method="POST" class="my-login-validation" novalidate="">
            <div class="form-group">
              <label for="name" class="text">本站昵称：</label>
              <el-input class="forminput" name="name" v-model="userinfo.name" />
            </div>
            <div class="form-group">
              <label for="phone" class="text">手&ensp;机&ensp;号：</label>

              <el-input class="forminput" name="phone" v-model="userinfo.phone" maxlength="11" />
            </div>
            <div class="form-group">
              <label for="code" class="text">验&ensp;证&ensp;码：</label>
              <el-input id="code" style="width: 230px;" class="forminput" name="code" v-model="userinfo.code"
                maxlength="4" />
              <el-button id="codebtn" type="primary" class="forminput" :disabled="correct.codeclick" @click="pushcode">
                <span v-if="!correct.codetimes">获取验证码</span>
                <span v-if="correct.codetimes">倒计时{{ count }}s</span>
              </el-button>
            </div>

            <div class="form-group">
              <label for="password" class="text">密&ensp;&ensp;&ensp;&ensp;码：</label>
              <el-input class="forminput" type="password" v-model="userinfo.password" :minlength="6" :maxlength="18" />
              <!-- <div class="pwshow" @click="pwshow">
                      <img src="./image/pwnoshow.png" alt="">
                    </div> -->
            </div>
            <div class="form-group">
              <label for="password" class="text">确认密码：</label>
              <el-input id="password" class="forminput" type="password" v-model="userinfo.password2" />
            </div>

            <div class="hint">
              <p v-if="correct.passwordflag">两次密码不一致</p>
              <p v-if="correct.phoneflag">请输入正确的手机号</p>
            </div>

            <div class="form-group m-0">

              <el-button type="primary" class="btn btn-primary btn-block" @click="okregister"
                :disabled="correct.registerclick" style="width: 200px; margin-left:80px;">
                注册
              </el-button>

            </div>
            <div class="text-center">
              欢迎注册！ <router-link to="/login"><a href="register.html">返回登录</a>
              </router-link>
            </div>
          </form>
        </div>
        <div class="footer">
          2023 &mdash;&copy; Huixiao

        </div>
      </div>

    </body>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import debounce from '@/utils/debounce.js'
import { ElMessage } from 'element-plus';
import { submituser } from '@/store/user/index'
name: 'register'
let userinfo = reactive({
  name: '',
  phone: '',
  code: '',
  password: '',
  password2: ''
})
let correct = reactive({
  phoneflag: false,
  passwordflag: false,
  codeclick: true,
  registerclick: true,
  codetimes: false,
  messageflag: false
})
var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
watch([userinfo, correct], (oldValue, newValue) => {
  //验证手机号
  if (newValue[0].phone) {
    if (reg_tel.test(newValue[0].phone)) {
      correct.codeclick = false
      newValue[1].phoneflag = false
      newValue[1].codeclick = false
    } else {
      newValue[1].phoneflag = true
      newValue[1].messageflag = true
      newValue[1].codeclick = true
    }
  }
  //验证两次密码
  if (newValue[0].password == newValue[0].password2 && newValue[0].password != '') {
    newValue[1].passwordflag = false
    if (newValue[0].password == '') {
      newValue[1].passwordflag = false
    }
  }
  else {
    newValue[1].passwordflag = true
    newValue[1].messageflag = true
  }
  //验证信息是否全部正确
  if (!newValue[1].phoneflag && !newValue[1].passwordflag) {
    newValue[1].registerclick = false
    newValue[1].messageflag = false
  } else {
    newValue[1].registerclick = true

  }
})

//验证码定时器
let timer = ref();
let count = ref();
let TIME_COUNT = ref(60)
//发送验证码
const store = submituser();
const pushcode = debounce(async function () {
  if (!timer.value) {
    count.value = TIME_COUNT.value;
    correct.codetimes = true;
    timer.value = setInterval(() => {
      if (count.value > 0 && count.value <= TIME_COUNT.value) {
        count.value--;
      } else {
        correct.codetimes = false;
        clearInterval(timer.value);
        timer.value = null;
      }
    }, 1000);
    store.$patch(state => {
      state.register.name = userinfo.name
      state.register.cellphone = userinfo.phone
      state.register.password = userinfo.password
      state.register.phonecode = userinfo.code
    })
    await store.codesubmit()
  }

}, 500)
const router = useRouter();
const okregister = debounce(async function () {
  store.$patch(state => {
    state.register.name = userinfo.name
    state.register.cellphone = userinfo.phone
    state.register.password = userinfo.password
    state.register.phonecode = userinfo.code
  })
  await store.registersubmit()
  console.log(111, store.reisterflag);
  if (store.reisterflag.code == 200) {
    ElMessage.success('注册成功')
    router.push({ path: "/login", query: { userphone: userinfo.phone } });
  }
  else {
    ElMessage.error('验证码错误')
  }

}, 500)


</script>

<style scoped lang="scss" src="./Register.scss">
</style>