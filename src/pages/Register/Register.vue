<template>

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
              <img src="./image/neutral.png" alt="logo">
            </div>
            <div class="card fat">
              <div class="card-body">
                <h4 class="card-title">Register</h4>
                <form method="POST" class="my-login-validation" novalidate="">
                  <div class="form-group">
                    <label for="name">本站昵称：</label>
                    <el-input class="forminput" name="name" v-model="userinfo.name" />
                  </div>
                  <div class="form-group">
                    <label for="phone">手&ensp;机&ensp;号：</label>
                    <el-input class="forminput" name="phone" v-model="userinfo.phone" maxlength="11" />
                  </div>
                  <div class="form-group">
                    <label for="code">验&ensp;证&ensp;码：</label>
                    <el-input id="code" style="width: 220px;" class="forminput" name="code" v-model="userinfo.code" />
                    <el-button id="codebtn" type="primary" class="forminput" :disabled="correct.codeclick"
                      @click="pushcode">
                      <span v-if="!correct.codetimes">获取验证码</span>
                      <span v-if="correct.codetimes">倒计时{{ count }}s</span>
                    </el-button>
                  </div>

                  <div class="form-group">
                    <label for="password">密&ensp;&ensp;&ensp;&ensp;码：</label>
                    <el-input class="forminput" type="password" v-model="userinfo.password" />
                    <!-- <div class="pwshow" @click="pwshow">
                      <img src="./image/pwnoshow.png" alt="">
                    </div> -->
                  </div>
                  <div class="form-group">
                    <label for="password">确认密码：</label>
                    <el-input id="password" class="forminput" type="password" v-model="userinfo.password2" />
                    <!-- @mouseenter="PWlogoenter" @mouseleave="PWlogoleave" -->
                    <!-- <div class="pwshow" @click="pwshow">
                      <img src="./image/pwnoshow.png" alt="">
                    </div> -->
                  </div>

                  <div class="form-group">
                    <div class="hint">
                      <p v-if="correct.passwordflag">两次密码不一致</p>
                      <p v-if="correct.phoneflag">请输入正确的手机号</p>
                    </div>

                  </div>

                  <div class="form-group m-0">

                    <el-button type="submit" class="btn btn-primary btn-block" @click="okregister"
                      :disabled="correct.registerclick">
                      注册
                    </el-button>


                  </div>
                  <div class="mt-4 text-center">
                    Welcome to register <router-link to="/login"><a href="register.html">Return to login</a>
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
</template>

<script setup>
  import { ref, reactive, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import debounce from '@/utils/debounce.js'
  import { ElMessage } from 'element-plus';
  name: 'register'
  let userinfo = reactive({
    name: '王俏栋',
    phone: '',
    code: '',
    password: '',
    password2: ''
  })
  let correct = reactive({
    phoneflag: false,
    passwordflag: false,
    codeclick: true,
    registerclick: false,
    codetimes: false,
  })
  var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  watch([userinfo, correct], (oldValue, newValue) => {
    //验证手机号
    if (newValue[0].phone) {
      if (reg_tel.test(newValue[0].phone)) {
        console.log(123);
        correct.codeclick = false
        newValue[1].phoneflag = false
      } else {
        newValue[1].phoneflag = true
      }
    }
    //验证两次密码
    if (newValue[0].password == newValue[0].password2) {
      newValue[1].passwordflag = false
    }
    else {
      newValue[1].passwordflag = true
    }
    //验证信息是否全部正确
    console.log(newValue[1].phoneflag, newValue[1].phoneflag);
    if (!newValue[1].phoneflag && !newValue[1].passwordflag) {
      newValue[1].registerclick = false
      console.log('可以注册');
    } else {
      console.log('no');
    }
  })

  //验证码定时器
  let timer = ref();
  let count = ref();
  let TIME_COUNT = ref(60)
  const pushcode = () => {
    if (!timer.value) {
      count.value = TIME_COUNT.value;
      correct.codetimes = true;
      timer.value = setInterval(() => {
        if (count.value > 0 && count.value <= TIME_COUNT.value) {
          count.value--;
          // console.log("count----", count);
        } else {
          correct.codetimes = false;
          clearInterval(timer.value);
          timer.value = null;
        }
      }, 1000);
      ElMessage.success('已发送，请注意查收')
      // alert("已发送，请注意查收");
    }

  }
  const router = useRouter();
  const okregister = debounce(function () {
    if (1) {
      ElMessage.success('注册成功')
      router.push({ path: "/login", query: { userphone: userinfo.phone } });
    }
    else {
      ElMessage.error('请检查手机号或密码')
    }

  }, 500)


</script>

<style scoped lang="scss" src="./Register.scss">

</style>