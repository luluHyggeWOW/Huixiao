
import { defineStore } from 'pinia'
import { repLogin, repPhonecode, repRegister } from '@/api/api';
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus';
import { usermain } from '@/store/index'

export const submituser = defineStore('user', () => {

  const user = reactive({
    cellphone: "",
    password: ""
  })
  const register = reactive({
    name: "",
    cellphone: "",
    password: "",
    phonecode: ""
  })
  const reisterflag = ref()
  async function loginsubmit () {
    let data = new window.FormData();
    // data.append('username', `{"password":${user.password},"authType":"password","cellphone":${user.cellphone}`);
    data.append('username', `{"password":"1234","authType":"password","cellphone":"12333333333"}`);
    let result = await repLogin(data);
    const store = usermain()
    if (result.access_token) {
      store.$patch(state => {
        state.userinfo.usertoken = result.access_token
        state.userinfo.id = user.cellphone
      })

    } else {
      ElMessage.error('登陆失败')
    }



  }
  async function registersubmit () {
    let data = {
      userPhone: register.cellphone,
      userPassward: register.password,
      userName: register.name,
      sms: register.phonecode,
    }
    let result = await repRegister(data, register.cellphone);
    reisterflag.value = result
    console.log('registerresult', reisterflag.value);
  }
  async function codesubmit () {
    let phone = register.cellphone;
    let result = await repPhonecode(phone);
    if (result.code == 200) {
      ElMessage.success('验证码发送成功')
    }
    else {
      ElMessage.error(result.data)
    }
  }


  return {
    user,
    register,
    submituser,
    loginsubmit,
    registersubmit,
    codesubmit,
    reisterflag

  }

}

)





