
import { defineStore } from 'pinia'
import {
  repLogin, repPhonecode, repRegister, repgetAllfankui, repgetMyfankui, repgetAllsolution,
  repgetMysolution, reppushfankui, reppushsolution, repdeletefankui, repchangefankui,
  repdeleteMyfankui, repForgetcode, repForgetPassword
} from '@/api/api';
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus';
import { usermain } from '@/store/index'
import { useRoute, useRouter } from 'vue-router';
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
  const route = useRoute();
  const router = useRouter();
  const fankuiflag = ref(false)
  const myfankui = ref();
  const allfankui = ref();
  const mysolution = ref();
  const allsolution = ref();
  const token = localStorage.getItem("huixiao");
  async function loginsubmit (data) {
    let result = await repLogin(data);
    if (result.access_token) {
      const store = usermain()
      localStorage.setItem('huixiao', result.access_token);
      ElMessage.success('登陆成功')
      await store.getuserinfo()
      router.push({ path: "/news" });
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
  async function forgetpassword (data) {
    let result = await repForgetPassword(data, register.cellphone);
    console.log(111, result);
    if (result.code == 200) {
      ElMessage.success('重置密码成功！')
    }
    else if (result.code == 201) {
      ElMessage.warning('验证码错误!')
    } else {
      ElMessage.error('重置密码失败！')
    }

  }
  async function codesubmit () {
    let phone = register.cellphone;
    let result = await repPhonecode(phone);
    if (result.code == 200) {
      ElMessage.success('验证码发送成功')
    }
    else {
      ElMessage.error('验证码发送失败')
    }
  }
  async function forgetcodesubmit (phone) {
    let result = await repForgetcode(phone);
    if (result.code == 200) {
      ElMessage.success('验证码发送成功')
    }
    else {
      ElMessage.error(result.data)
    }
  }
  async function getAllfankui () {
    let result = await repgetAllfankui(token);
    if (result.code == 200) {
      allfankui.value = result.data
    }
    else {
      ElMessage.error(result.data)
    }
  }
  async function getMyfankui () {
    let result = await repgetMyfankui(token);
    if (result.code == 200) {
      myfankui.value = result.data
    }
    else {
      ElMessage.error(result.data)
    }
  }
  async function deleteMyfankui (hid) {
    let result = await repdeleteMyfankui(hid, token);
    if (result.code == 200) {
      ElMessage.success("删除成功")
    }
    else {
      ElMessage.error("删除失败")
    }
  }
  async function getAllsolution () {
    let result = await repgetAllsolution(token);
    if (result.code == 200) {
      allsolution.value = result.data
    }
    else {
      ElMessage.error(result.data)
    }
  }
  async function getMysolution () {
    let result = await repgetMysolution(token);
    if (result.code == 200) {
      mysolution.value = result.data
    }
    else {
      ElMessage.error(result.data)
    }
  }
  // async function deleteMysolution () {
  //   let result = await repdeleteMysolution(token);
  //   if (result.code == 200) {
  //     mysolution.value = result.data
  //   }
  //   else {
  //     ElMessage.error(result.data)
  //   }
  // }
  async function pushfankui (data) {
    let result = await reppushfankui(data, token);
    if (result.code == 200) {
      ElMessage.error('提交成功')
    }
    else {
      ElMessage.error('提交失败')
    }
  }
  async function pushsolution (data) {
    let result = await reppushsolution(data);
    if (result.code == 200) {
      ElMessage.error('提交成功')
    }
    else {
      ElMessage.error('提交失败')
    }
  }
  async function changefankui (data) {
    let result = await repchangefankui(data, token);
    if (result.code == 200) {
      ElMessage.success("修改成功")
    }
    else {
      ElMessage.error("修改失败")
    }
  }
  return {
    user,
    register,
    submituser,
    loginsubmit,
    registersubmit,
    codesubmit,
    reisterflag,
    allfankui,
    myfankui,
    mysolution,
    allsolution,
    getAllfankui,
    getMyfankui,
    getAllsolution,
    getMysolution,
    pushfankui,
    pushsolution,
    changefankui,
    fankuiflag,
    deleteMyfankui,
    forgetpassword,
    forgetcodesubmit
    // deleteMysolution
  }

}

)





