
import { defineStore } from 'pinia'
import { repUserinfo, repChangeUserinfo } from '@/api/api';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from "vue-router"

export const usermain = defineStore('users', () => {
  const userinfo = reactive({
    userId: "",
    userName: "",
    userType: "",
    userAvatar: "",
    userEmail: "",
    userPhone: "",
    userPassward: null,
    userIntroduct: "",
    userCreateTime: "",
    userStatus: "正常",
    userSchool: "",
    userSex: "",
    userAge: '',
    userUpdateTime: "",
    usertoken: '',
    userimg: '',
  })
  const $router = useRouter()
  const temporaryUserinfo = reactive({})
  let token = localStorage.getItem('huixiao')
  async function getuserinfo () {
    let result = await repUserinfo(token);
    if (!result) {
      ElMessageBox({
        title: '登录错误',
        message: '登录过期请重新登录',
        confirmButtonText: '确定',
        type: 'error',
        callback: () => {
          $router.push('/login')
        },
      })
    }
    else if (result.code == 200) {
      userinfo.userName = result.data.userName;
      // userinfo.userType = result.data.userType;
      // userinfo.userAvatar = result.data.userAvatar
      userinfo.userEmail = result.data.userEmail
      // userinfo.userPhone = result.data.userPhone
      userinfo.userIntroduct = result.data.userIntroduct
      // userinfo.userCreateTime = result.data.userCreateTime
      userinfo.userSchool = result.data.userSchool
      userinfo.userSex = result.data.userSex
      userinfo.userAge = result.data.userAge
      userinfo.userId = result.data.userId
      let refs = toRefs(userinfo)
      for (const key in refs) {
        temporaryUserinfo[key] = refs[key].value
      }
    }



  }
  async function changeuserinfo () {
    let token = localStorage.getItem('huixiao')

    console.log('temporaryUserinfo', temporaryUserinfo);
    let data = {
      userName: temporaryUserinfo.userName,
      userEmail: temporaryUserinfo.userEmail,
      userIntroduct: temporaryUserinfo.userIntroduct,
      userSchool: temporaryUserinfo.userSchool,
      userSex: temporaryUserinfo.userSex,
      userAge: temporaryUserinfo.userAge,
    }
    let result = await repChangeUserinfo(token, data);
    if (result.code == 200) {
      ElMessage.success('信息修改成功!')
      await getuserinfo();
    } else {
      ElMessage.success('信息修改失败!')
    }


  }
  return {
    userinfo,
    getuserinfo,
    usermain,
    temporaryUserinfo,
    changeuserinfo
  }
})
