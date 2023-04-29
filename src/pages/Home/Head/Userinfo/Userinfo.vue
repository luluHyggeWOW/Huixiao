<template>

  <div class="box">
    <div class="closebox"
         @click="closebox"><img src="./image/closebtn.png"
           alt=""></div>
    <div class="top">
      <el-upload class="avatar-uploader"
                 action="http://8.130.115.231:63010/user/open/upload"
                 :show-file-list="false"
                 :before-upload="beforeAvatarUpload"
                 :on-success="handleAvatarSuccess"
                 accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF">
        <div class="imgdiv"
             ref="userimgdiv">
          <img :src="userinfo.img"
               alt="">
          <div class="changeimg"><img src="./image/camera.png"
                 alt="">
          </div>
        </div>
      </el-upload>
      <p @click="qq">{{userinfo.name}}</p>

    </div>
    <div class="title">
      <el-tabs type="border-card"
               @tab-click="basicbtn"
               v-model="activeName"
               style="height:600px ;width:1178px;border-radius: 0px 0px 15px 15px;">
        <el-tab-pane label="基础信息"
                     name="basic">
          <template #label><span style=" "
                  font-size=30px;>基础信息</span>
          </template>
        </el-tab-pane>
        <el-tab-pane label="教育信息"
                     name="school">
        </el-tab-pane>
        <el-tab-pane label="爱好信息"
                     name="basic1"></el-tab-pane>
        <el-tab-pane label="其他信息"
                     name="basic2"></el-tab-pane>
        <el-tab-pane label="我的发帖"
                     name="myforum"></el-tab-pane>
        <el-tab-pane label="我的二手"
                     name="myshop"
                     @click="getmyShopList"></el-tab-pane>
      </el-tabs>

    </div>
    <div class="infobox">
      <div class="besicinfo"
           v-if=infopage.basicinfo>
        <div class="div">
          <p>用户昵称：</p>
          <div class="input">
            <el-input v-model="userinfo.name"
                      placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="div">
          <p>邮箱：</p>
          <div class="input">
            <el-input v-model="userinfo.email"
                      placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="div">
          <p>性别：</p>
          <div class="sexdiv">
            <el-radio v-model="userinfo.sex"
                      label="男"
                      border>男</el-radio>
            <el-radio v-model="userinfo.sex"
                      label="女"
                      border>女</el-radio>
          </div>

        </div>
        <div class="div">
          <p>年龄：</p>
          <div class="input">
            <el-input v-model.number="userinfo.age"
                      placeholder="请输入内容"></el-input>

          </div>
        </div>
        <div class="div">
          <p>个人简介：</p>
          <div class="input"
               style=" width:500px;">
            <el-input type="textarea"
                      placeholder="请输入内容"
                      v-model="userinfo.introduct"
                      maxlength="30"
                      show-word-limit>
            </el-input>
          </div>
        </div>

      </div>
      <div class="schoolinfo"
           v-if=infopage.schoolinfo>
        <div class="div">
          <p>学校名称：</p>
          <div class="input">
            <el-input v-model="userinfo.school"
                      placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="div">
          <p>入学时间：</p>
          <div class="input">
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>
          </div>
        </div>

        <div class="div">
          <p>专业：</p>
          <div class="input">
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>

          </div>
        </div>
        <div class="div">
          <p>学历：</p>
          <div class="input">
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>

          </div>
        </div>
      </div>
      <div class="myforuminfo"
           v-if=infopage.myforuminfo>
        <div class="commentbox"
             v-for="(list) in myForumList"
             :key="list.t_id">
          <div class="user">
            <img alt=""
                 :src="list.t_img">
            <p class="username">{{list.t_uid}}</p>
          </div>
          <div class="questionbox">
            <p class="question">{{list.t_date}}</p>
            <div class="more">
              <img :src="list.t_img"
                   alt=""
                   v-if="list.t_img">
              <span>{{list.t_date}}</span>
            </div>
          </div>
          <div class="footerline"></div>

        </div>

      </div>
      <div class="myshopinfo"
           v-if=infopage.myforuminfo>
        <div class="commentbox"
             v-for="(list) in myShopList"
             :key="list.t_id">
          <div class="user">
            <img alt=""
                 :src="list.t_img">
            <p class="username">{{list.t_uid}}</p>
          </div>
          <div class="questionbox">
            <p class="question">{{list.t_date}}</p>
            <div class="more">
              <img :src="list.t_img"
                   alt=""
                   v-if="list.t_img">
              <span>{{list.t_date}}</span>
            </div>
          </div>
          <div class="footerline"></div>

        </div>

      </div>
    </div>
    <div class="btn"
         @click="pushinfo">
      <el-button type="primary"
                 style="width:150px;height:50px;font-size:20px;">提交</el-button>
    </div>
  </div>

</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted, toRaw } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { getForumList } from '@/store/forum/index'
import { getShopList } from '@/store/shop/index'
import { usermain } from '@/store/index'
import { ElMessage, ElMessageBox } from 'element-plus';
name: 'Userinfo'
const route = useRoute();
const $router = useRouter();
const activeName = ref('basic');
const userinfo = reactive({
  img: 'http://121.36.100.147:9000/test/testneutral_1682501087418.png',
  name: '',
  email: '',
  sex: '',
  age: '',
  introduct: '',
  school: '',
})
const infopage = reactive({
  basicinfo: true,
  schoolinfo: false,
  myforuminfo: false
})
const myForumList = ref({})
const myShopList = ref({})

const userimgdiv = ref(null)
const basicbtn = (tab, event) => {
  infopage.schoolinfo = false
  infopage.basicinfo = false
  infopage.myforuminfo = false
  if (tab.props.name == 'basic') {
    infopage.basicinfo = true
  }
  else if (tab.props.name == 'school') {
    infopage.schoolinfo = true
  }
  else if (tab.props.name == 'myforum') {
    infopage.myforuminfo = true
    const store1 = getForumList();
    store1.getmyForumList()
    myForumList.value = store1.myforum
  }
  else if (tab.props.name == 'myshop') {
    infopage.myshopinfo = true
    const store2 = getShopList();
    store2.getmyShopList()
    myShopList.value = store2.myforum
  }
  else {

  }
  // if ()
}
const userimg = (e) => {
  // console.log(e.children[1].setAttribute());
  e.onmouseover = () => {
    e.children[1].classList.add('changeimgadd')
  }
  e.onmouseout = () => {
    e.children[1].classList.remove('changeimgadd')
  }
}
const beforeAvatarUpload = (file) => {

  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    ElMessage.error('上传头像图片大小不能超过 2MB!')
  }
}
const handleAvatarSuccess = (file) => {
  ElMessage.success('头像修改成功！');
  userinfo.img = toRaw(file).data;
}


const closebox = () => {
  document.body.style.overflow = 'auto';
  $router.push('/news')
}
function pushinfo (params) {
  ElMessageBox({
    title: '确认修改个人信息',
    message: '修改后无法回档',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',

  }).then(async (status) => {
    if (status == 'confirm') {
      const store = usermain();
      store.temporaryUserinfo.userName = userinfo.name;
      store.temporaryUserinfo.userEmail = userinfo.email;
      store.temporaryUserinfo.userIntroduct = userinfo.introduc;
      store.temporaryUserinfo.userSchool = userinfo.school;
      store.temporaryUserinfo.userSex = userinfo.sex;
      store.temporaryUserinfo.userAge = userinfo.age;
      await store.changeuserinfo();

    }
  }).catch((status) => {
    if (status == 'cancel') {

    }
  })

}
async function getuser (params) {
  const store = usermain();
  await store.getuserinfo();

  userinfo.name = store.userinfo.userName;
  userinfo.email = store.userinfo.userEmail;
  userinfo.introduct = store.userinfo.userIntroduct;
  userinfo.school = store.userinfo.userSchool;
  userinfo.sex = store.userinfo.userSex;
  userinfo.age = store.userinfo.userAge;
}
const getmyForumList = async () => {
}
const getmyShopList = () => {

}
onMounted(() => {
  userimg(userimgdiv.value)
  getuser()
})

</script>

<style scoped lang="scss" src="./Userinfo.scss">
</style>
<style lang="scss">
.el-tabs__item {
  height: 70px;
  font-size: 20px;
  font-weight: 600;
}
</style>