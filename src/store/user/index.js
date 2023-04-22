
import { defineStore } from 'pinia'
import { repLogin, repphonecode } from '@/api/api';
import { ref, computed, reactive } from 'vue'
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

  async function loginsubmit () {
    let data = new window.FormData();
    data.append('username', `{"password":${user.password},"authType":"password","cellphone":${user.cellphone}`);
    let result = await repLogin(data);
    console.log('result', result);
  }
  async function codesubmit () {
    let phone = register.cellphone;
    let result = await repLogin(phone);
    console.log('result', result);
  }
  // const forumsList = () => {
  //   console.log('state', forumList.value)
  //   return forumList.value
  // }
  return {
    submituser,
    loginsubmit,
    user,
    codesubmit,
    register
  }

}

)





