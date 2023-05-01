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
          <img :src="userinfo.userAvatar"
               alt="">
          <div class="changeimg"><img src="./image/camera.png"
                 alt="">
          </div>
        </div>
      </el-upload>
      <p>{{userinfo.name}}</p>

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

        <el-tab-pane label="我的发帖"
                     name="myforum"></el-tab-pane>
        <el-tab-pane label="我的二手"
                     name="myshop"></el-tab-pane>
        <el-tab-pane label="我的点赞/收藏"
                     name="mylike"></el-tab-pane>
        <el-tab-pane label="我的购物车"
                     name="myshopcar"></el-tab-pane>
      </el-tabs>

    </div>
    <div class="infobox">
      <div class="besicinfo"
           v-if=infopage.basicinfo>
        <div class="div">
          <p>用户昵称：</p>
          <div class="input">
            <el-input v-model="userinfo.name"
                      placeholder="你什么都没留下"></el-input>
          </div>
        </div>
        <div class="div">
          <p>邮箱：</p>
          <div class="input">
            <el-input v-model="userinfo.email"
                      placeholder="你什么都没留下"></el-input>
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
                      placeholder="你什么都没留下"></el-input>

          </div>
        </div>
        <div class="div">
          <p>个人简介：</p>
          <div class="input"
               style=" width:500px;">
            <el-input type="textarea"
                      placeholder="你什么都没留下"
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
                      placeholder="你什么都没留下"></el-input>
          </div>
        </div>
        <div class="div">
          <p>入学时间：</p>
          <div class="input">
            <el-input v-model="input"
                      placeholder="你什么都没留下"></el-input>
          </div>
        </div>

        <div class="div">
          <p>专业：</p>
          <div class="input">
            <el-input v-model="input"
                      placeholder="你什么都没留下"></el-input>

          </div>
        </div>
        <div class="div">
          <p>学历：</p>
          <div class="input">
            <el-input v-model="input"
                      placeholder="你什么都没留下"></el-input>

          </div>
        </div>
      </div>
      <div class="forum myinfo"
           v-if=infopage.myforuminfo>
        <div class="all">
          <div class="div"
               v-for="(list,index) in infoList.myForumList"
               :key="index">
            <div class="img">
              <img :src="list.t_img"
                   alt="">
            </div>
            <div class="title">
              <p>1{{list.t_titile}}</p>
              <span>{{list.t_date}}</span>
            </div>
            <div class="handle">
              <el-button type="danger"
                         style="width:100px;height:40px;cursor: pointer;"><img src="./image/delement.png"
                     alt="">
                <p>删除</p>
              </el-button>

            </div>

          </div>

        </div>

      </div>
      <div class="shop myinfo"
           v-if=infopage.myshopinfo>
        <div class="all">
          <div class="div"
               v-for="(list,index) in infoList.myShopList"
               :key="index">
            <div class="img">
              <img :src="list.urlList[0]"
                   alt="">
            </div>
            <div class="title">
              <p>{{list.shopName}}</p>
              <span>{{list.shopIntuoduct}}</span>
            </div>
            <div class="handle"
                 @click="deletemyshop(list.shopId)">
              <el-button type="danger"
                         style="width:100px;height:40px;"><img src="./image/delement.png"
                     alt="">
                <p>删除</p>
              </el-button>

            </div>

          </div>

        </div>

      </div>
    </div>
    <div class="btn"
         @click="pushinfo"
         v-if="btnshow">
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
const btnshow = ref(true)
const infopage = reactive({
  basicinfo: true,
  schoolinfo: false,
  myforuminfo: false,
  myshopinfo: false,
})
const infoList = reactive({
  myForumList: '',
  myShopList: '',
})

const userimgdiv = ref(null)
const basicbtn = async (tab, event) => {
  infopage.schoolinfo = false
  infopage.basicinfo = false
  infopage.myforuminfo = false
  infopage.myshopinfo = false
  if (tab.props.name == 'basic') {
    infopage.basicinfo = true
    btnshow.value = true
  }
  else if (tab.props.name == 'school') {
    infopage.schoolinfo = true
    btnshow.value = true
  }
  else if (tab.props.name == 'myforum') {
    infopage.myforuminfo = true
    btnshow.value = false
    const store1 = getForumList();
    await store1.getmyForumList()
    infoList.myForumList = store1.myforum
    console.log('myforum.value', store1.myforum);
    console.log('myForumList', infoList.myForumList);
  }
  else if (tab.props.name == 'myshop') {
    infopage.myshopinfo = true
    btnshow.value = false
    const store2 = getShopList();
    await store2.getmyShopList()
    infoList.myShopList = store2.myshoplist
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
const deletemyshop = async (id) => {
  ElMessageBox({
    title: '是否删除',
    message: '删除后无法回档',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'error',

  }).then(async (status) => {
    if (status == 'confirm') {
      let store = getShopList()
      store.$patch(state => {
        state.deleteshopid = id
      })
      await store.deletemyShop()
      await store.getmyShopList()
      myShopList.value = store.myshoplist
    }
  }).catch((status) => {
    if (status == 'cancel') {

    }
  })

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
      store.temporaryUserinfo.userimg = userinfo.img;
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
  console.log(store.userinfo);
  userinfo.name = store.userinfo.userName;
  userinfo.email = store.userinfo.userEmail;
  userinfo.introduct = store.userinfo.userIntroduct;
  userinfo.school = store.userinfo.userSchool;
  userinfo.sex = store.userinfo.userSex;
  userinfo.age = store.userinfo.userAge;
  // userinfo.img = store.userinfo.userAge;
}
const getmyForumList = async () => {
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