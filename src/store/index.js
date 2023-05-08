
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
  })
  const $router = useRouter()
  const route = useRoute();
  const temporaryUserinfo = reactive({})
  let token = localStorage.getItem('huixiao')
  async function getuserinfo () {
    // console.log('getuserinfo', localStorage.getItem('huixiao'));
    token = localStorage.getItem('huixiao')
    let result = await repUserinfo(token);
    if (!result) {
      if (route.path == 'userinfo') {
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
      else {
        ElMessage.warning('还没有登录哦')
      }
    }
    else if (result.code == 200) {
      console.log('result.code200');
      userinfo.userName = result.data.userName;
      // userinfo.userType = result.data.userType;
      userinfo.userAvatar = result.data.userAvatar
      userinfo.userEmail = result.data.userEmail
      // userinfo.userPhone = result.data.userPhone
      userinfo.userIntroduct = result.data.userIntroduct
      // userinfo.userCreateTime = result.data.userCreateTime
      userinfo.userSchool = result.data.userSchool
      userinfo.userSex = result.data.userSex
      userinfo.userAge = result.data.userAge
      userinfo.userId = result.data.userId
      console.log('result.data.userAvatar', userinfo.userAvatar);
      let refs = toRefs(userinfo)
      for (const key in refs) {
        temporaryUserinfo[key] = refs[key].value
      }
    }



  }
  async function changeuserinfo (data) {
    let token = localStorage.getItem('huixiao');
    console.log(22222, data);
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
