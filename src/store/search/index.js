
import { defineStore } from 'pinia'
import { reqSearchList } from '@/api/api';
import { ref, computed, reactive } from 'vue'
export const searchlist = defineStore('user', () => {

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

  async function loginsubmit () {
    let data = new window.FormData();
    data.append('username', `{"password":${user.password},"authType":"password","cellphone":${user.cellphone}`);
    let result = await repLogin(data);
    console.log('loginresult', result);
  }
  async function registersubmit () {
    let data = {
      userPhone: register.cellphone,
      userPassward: register.password,
      userName: register.name,
      sms: register.phonecode,
    }
    data.append('username', `{"password":${user.password},"authType":"password","cellphone":${user.cellphone}`);
    let result = await repRegister(data);
    console.log('registerresult', result);
  }
  async function codesubmit () {
    let phone = register.cellphone;
    let result = await repPhonecode(phone);
    if (result.code == 200) {
      register.phonecode = result.data
    }
    else {
      ElMessage.error('发送失败')
    }
    console.log('coderesult', result);
  }

  // const forumsList = () => {
  //   console.log('state', forumList.value)
  //   return forumList.value
  // }
  return {
    user,
    register,
    submituser,
    loginsubmit,
    registersubmit,
    codesubmit,

  }

}

)





