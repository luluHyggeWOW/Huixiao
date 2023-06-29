<template>
  <div class="bg">

    <body class="my-login-page">
      <div class="logo"><img src="./image/logo.png" alt=""></div>

      <div class="box">
        <div class="brand">
          <img src="./image/neutral.png" alt="logo">
        </div>
        <div class="card-body">
          <h4 class="card-title">ForgetPassword</h4>
          <el-form method="POST" class="my-login-validation" :model="ForgetForm" novalidate="" :rules="rules">
            <div class="form-group">
              <label for="phone" class="text">手&ensp;机&ensp;号：</label>
              <el-form-item prop="phone" style="width: 350px;  margin-right:40px; ">
                <el-input class="forminput" name="phone" v-model="ForgetForm.phone" maxlength="11" />
              </el-form-item>
            </div>
            <div class="form-group">
              <label for="code" class="text">验&ensp;证&ensp;码：</label>
              <el-form-item prop="code" style="width:230px;">
                <el-input id="code" style="width: 183px; margin-left:-17px;" class="forminput" name="code"
                  v-model="ForgetForm.code" maxlength="4" />
              </el-form-item>
              <el-button id="codebtn" type="primary" style="margin-left:-65px;z-index:99;width:105px;" class="forminput"
                :disabled="correct.codeclick" @click="pushcode">
                <span v-if="!correct.codetimes">获取验证码</span>
                <span v-if="correct.codetimes"> 倒计时{{ count }}s </span>
              </el-button>
            </div>

            <div class="form-group">
              <label for="password" class="text">密&ensp;&ensp;&ensp;&ensp;码：</label>
              <el-form-item prop="password1" style="width: 350px; margin-right:40px">
                <el-input class="forminput" type="password" v-model="ForgetForm.password1" show-password />
              </el-form-item>
            </div>
            <div class="form-group">
              <label for="password" class="text">确认密码：</label>
              <el-form-item prop="password2" style="width: 350px; margin-right:40px">
                <el-input class="forminput" type="password" v-model="ForgetForm.password2" show-password />
              </el-form-item>
            </div>

            <div class="form-group m-0">

              <el-button type="primary" class="btn btn-primary btn-block" @click="okForget"
                :disabled="correct.registerclick" style="width: 200px; margin-left:80px;">
                修改
              </el-button>

            </div>
            <div class="text-center">
              取消修改 <router-link to="/login"><a href="register.html">返回登录</a>
              </router-link>
            </div>
          </el-form>
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
let ForgetForm = reactive({
  phone: '',
  code: '',
  password1: '',
  password2: ''
})
let correct = reactive({
  phoneflag: false,
  passwordflag: false,
  codeclick: true,
  registerclick: true,
  codetimes: false,
})
var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
const validatorUserName = (rule, value, callback) => {
  // rule 验证对象 value 元素文本内容 callback 函数符合条件放行 不符合注入错误提示信息
  console.log(value);
  if (reg_tel.test(value)) {
    changecode(false)
    console.log(correct.codeclick);
    callback()
  } else {
    changecode(true)
    callback(new Error('手机号不正确'))
  }
}
const changecode = (flag) => {
  correct.codeclick = flag
}
const validatorPassword1 = (rule, value, callback) => {
  // rule 验证对象 value 元素文本内容 callback 函数符合条件放行 不符合注入错误提示信息
  console.log(value);
  if (value.length >= 6 && value.length <= 18) {
    callback()
  } else {
    callback(new Error('密码长度为6-18位'))
  }
}
const validatorPassword2 = (rule, value, callback) => {
  // rule 验证对象 value 元素文本内容 callback 函数符合条件放行 不符合注入错误提示信息
  console.log(value);
  if (value == ForgetForm.password1) {
    correct.passwordflag = true
    callback()
  } else {
    correct.passwordflag = false
    callback(new Error('两次密码必须一致'))
  }
}
const rules = {
  phone: [
    // { required: true, message: '用户名不能为空', trigger: 'blur' },
    { trigger: 'blur', validator: validatorUserName },
  ],
  password1: [{ trigger: 'blur', validator: validatorPassword1 }],
  password2: [{ trigger: 'blur', validator: validatorPassword2 }],
}
watch
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
    console.log(ForgetForm.phone, 1111);
    await store.forgetcodesubmit(ForgetForm.phone)
  }

}, 500)
const router = useRouter();
const okForget = debounce(async function () {
  let data = {
    userPhone: ForgetForm.phone,
    userPassward: ForgetForm.password2,
    sms: ForgetForm.code,
  }
  await store.forgetpassword(data).then(() => {
    router.push({ path: "/login", query: { userphone: ForgetForm.phone } });
  }).catch((error) => {

  })
}, 500)

watch([correct], (oldValue, newValue) => {
  console.log(newValue[0].phoneflag, newValue[0].passwordflag);
  //验证信息是否全部正确
  if (!newValue[0].phoneflag && newValue[0].passwordflag && ForgetForm.code.length == 4) {
    newValue[0].registerclick = false
  } else {
    newValue[0].registerclick = true

  }
})
</script>

  <style scoped lang="scss" src="./ForgetPassword.scss">
</style>