<template>
  <div class="dialogFormdiv">
    <el-dialog title="修改帖子"
               v-model="dialogFormVisible"
               :close-on-click-modal=false
               :modal=true
               :showClose=false
               :lock-scroll="false"
               width="800px">
      <img src="./image/creation.png"
           alt="">
      <el-form :model="form">
        <el-form-item label="标题：">
          <el-input v-model="formclasstitle.title"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类别：">
          <el-select v-model="formclasstitle.class"
                     placeholder="请选择讨论类别"
                     @change="changeclass">
            <el-option label="生活"
                       value="生活"></el-option>
            <el-option label="学习"
                       value="学习"></el-option>
            <el-option label="美食"
                       value="美食"></el-option>
            <el-option label="娱乐"
                       value="娱乐"></el-option>
            <el-option label="其他"
                       value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容：">
          <el-input type="textarea"
                    placeholder="请输入内容"
                    maxlength="100"
                    autocomplete="off"
                    show-word-limit
                    v-model="formclasstitle.source">
          </el-input>
        </el-form-item>
        <el-form-item label="图片：">
          <el-upload action="http://8.130.115.231:63010/user/open/upload"
                     list-type="picture-card"
                     :limit=1
                     :on-change="upload"
                     :before-upload="beforeAvatarUpload"
                     :on-success="handleAvatarSuccess2"
                     accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF">
            <div class="el-icon-plus">
              +</div>
          </el-upload>
          <el-dialog v-model="form.imgflag">
            <img width="100%"
                 :src="formclasstitle.img"
                 alt="">
          </el-dialog>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogForm('no')">取 消</el-button>
          <el-button type="primary"
                     @click="dialogForm('yes')">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <div class="box">
    <div class="closebox"
         @click="closebox"><img src="./image/closebtn1.png"
           alt=""></div>
    <div class="top">
      <el-upload class="avatar-uploader"
                 action="http://101.43.241.101:63010/user/open/upload"
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
        <el-tab-pane label="我的收藏"
                     name="myforumcollect"></el-tab-pane>
        <el-tab-pane label="我的二手"
                     name="myshop"></el-tab-pane>
        <el-tab-pane label="我的购物车"
                     name="myshopcar"></el-tab-pane>
        <el-tab-pane label="我的购买"
                     name="mybuyshop"></el-tab-pane>
      </el-tabs>

    </div>
    <div class="infobox">
      <div class="besicinfo"
           v-if=infopage.basicinfo>
        <div class="div">
          <p>用户昵称：</p>
          <div class="input">
            <el-input v-model="userinfo.name"
                      placeholder="你什么都没留下"
                      maxlength=8></el-input>
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
      <div class="myinfo forum"
           v-if=infopage.myforuminfo>
        <div class="all">
          <div class="div MyForum"
               v-for="(list,index) in infoList.myForumList"
               :key="index">
            <div class="img">
              <img :src="list.t_img"
                   alt="">
            </div>
            <div class="title">
              <p>{{list.t_titile}}</p>
              <span>{{list.t_source}}</span>
            </div>
            <div class="MyForum handle ">
              <el-button type="primary"
                         style="width:100px;height:40px;"
                         @click="changeforum(list)"><img src="./image/change.png"
                     alt="">
                <p>修改</p>
              </el-button>
              <el-button type="danger"
                         style="width:100px;height:40px;"
                         @click="deletemyforum(list.t_id)"><img src="./image/delement.png"
                     alt="">
                <p>删除</p>
              </el-button>
            </div>

          </div>

        </div>

      </div>
      <div class="myinfo forumcollect"
           v-if=infopage.myforumcollectinfo>
        <div class="all">
          <div class="div"
               v-for="(list,index) in infoList.myForumCollectList"
               :key="index">
            <div class="img">
              <img :src="list.user_avatar"
                   alt="">
            </div>

            <div class="title">
              <p>{{list.user_name}}</p>
              <p>{{list.tk_title}}</p>
              <!-- <span>{{list.shopIntuoduct}}</span> -->
            </div>
            <div class="ForumCollect handle "
                 @click="deleteforumcollection(list.usc_sid)">
              <el-button type="primary"
                         style="width:120px;height:40px;cursor: pointer;"><img src="./image/collected.png"
                     alt="">
                <p>已收藏</p>
              </el-button>

            </div>

          </div>

        </div>

      </div>
      <div class="myinfo shop"
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
            <div class="time">
              <p>发布时间：<br>{{list.shopData}}</p>
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
      <div class="myinfo shopcar"
           v-if=infopage.myshopcarinfo>
        <div class="all">
          <div class="div"
               v-for="(list,index) in infoList.myShopCarList"
               :key="index">
            <div class="img">
              <img :src="list.buyImgUrl"
                   alt="">
            </div>
            <div class="title">
              <p>{{list.buyShopName}}</p>
              <span style="width:600px ;padding-right:100px">{{list.buyShopIntuoduct}}</span>
            </div>
            <div class="time">
              <p>加入时间：<br>{{list.buyData}}</p>
            </div>
            <div class="handle shopcar">
              <div class="buy">
                <el-button type="primary"
                           style="width:100px ;height:40px;"
                           @click="myshopcarhandle('buy',list.buyShopId)">
                  <img src="./image/shopbuy.png"
                       alt="">
                  <p>购买</p>
                </el-button>
              </div>
              <div class="delete">
                <el-button type="danger"
                           style="width:100px ;height:40px;"
                           @click="myshopcarhandle('delete',list.buyShopId)">
                  <img src="./image/delement.png"
                       alt="">
                  <p>移除</p>
                </el-button>
              </div>

            </div>

          </div>

        </div>

      </div>
      <div class="mybuyshop myinfo"
           v-if=infopage.mybuyshopinfo>
        <div class="all">
          <div class="div"
               v-for="(list,index) in infoList.myBuyShopList"
               :key="index">
            <div class="img">
              <img :src="list.buyImgUrl"
                   alt="">
            </div>
            <div class="title">
              <p>{{list.buyShopName}}</p>
              <span>{{list.buyShopIntuoduct}}</span>
            </div>
            <div class="time">
              <p>购买时间：<br>{{list.buyData}}</p>
            </div>
            <!-- <div class="handle">
              <div class="buy">
                <el-button type="primary"
                           style="width:100px ;height:40px;"
                           @click="myshopcarhandle('buy',list.buyId)">
                  <img src="./image/delement.png"
                       alt="">
                  <p>购买</p>
                </el-button>
              </div>
              <div class="delete">
                <el-button type="danger"
                           style="width:100px ;height:40px;"
                           @click="myshopcarhandle('delete',list.buyId)">
                  <img src="./image/delement.png"
                       alt="">
                  <p>移除</p>
                </el-button>
              </div>

            </div> -->

          </div>

        </div>

      </div>
    </div>
    <div class="btn"
         @click="pushinfo"
         v-if="btnshow">
      <el-button type="primary"
                 style="width:150px;height:50px;font-size:20px;cursor: pointer;">提交</el-button>
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
import debounce from "@/utils/debounce.js";
name: 'Userinfo'
const route = useRoute();
const $router = useRouter();
const activeName = ref('basic');
const userinfo = reactive({
  img: '',
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
  myshopcarinfo: false,
  myforumcollectinfo: false,
  mybuyshopinfo: false
})
const infoList = reactive({
  myForumList: '',
  myShopList: '',
  myForumCollectList: '',
  myShopCarList: '',
  myBuyShopList: ''
})
const handleClose = () => {

}
const userimgdiv = ref(null)
const store1 = getForumList();
const store2 = getShopList();
const dialogFormVisible = ref(false)
const form = ref({})
const formclasstitle = reactive({
  class: '',
  title: '',
  source: '',
  img: '',
  tid: '',
  uid: '',
})
const changeclass = (e) => {
  formclasstitle.class = e
}
const beforeAvatarUpload = (file) => {
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 2MB!')
  }
}
const basicbtn = async (tab, event) => {
  infopage.schoolinfo = false
  infopage.basicinfo = false
  infopage.myforuminfo = false
  infopage.myforumcollectinfo = false
  infopage.myshopinfo = false
  infopage.myshopcarinfo = false
  infopage.mybuyshopinfo = false
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
    await store1.getmyForumList()
    infoList.myForumList = store1.myforum
  }
  else if (tab.props.name == 'myforumcollect') {
    infopage.myforumcollectinfo = true
    btnshow.value = false
    await store1.getmyForumCollectList()
    infoList.myForumCollectList = store1.myForumCollectList

  }
  else if (tab.props.name == 'myshop') {
    infopage.myshopinfo = true
    btnshow.value = false
    await store2.getmyShopList()
    infoList.myShopList = store2.myshoplist
    infoList.myShopList = [...infoList.myShopList]
  }
  else if (tab.props.name == 'myshopcar') {
    infopage.myshopcarinfo = true
    btnshow.value = false
    await store2.getmyShopCarList()
    infoList.myShopCarList = store2.myshopcarlist
  }
  else if (tab.props.name == 'mybuyshop') {
    infopage.mybuyshopinfo = true
    btnshow.value = false
    await store2.getMyBuyShop()
    infoList.myBuyShopList = store2.getMyBuyShopList
    infoList.myBuyShopList = [...infoList.myBuyShopList]
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
const handleAvatarSuccess = (file) => {
  ElMessage.success('头像修改成功！');
  userinfo.img = toRaw(file).data;
}
const handleAvatarSuccess2 = (file) => {
  formclasstitle.img = toRaw(file).data;
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
      await store.deletemyShop(id)
      await store.getmyShopList()
      infoList.myShopList = store.myshoplist
      infoList.myShopList = [...infoList.myShopList]
    }
  }).catch((status) => {
    if (status == 'cancel') {

    }
  })

}

const closebox = () => {
  document.body.style.overflow = 'auto';
  $router.go(-1)
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
      let data = {
        "userName": userinfo.name,
        "userEmail": userinfo.email,
        "userIntroduct": userinfo.introduct,
        "userAvatar": userinfo.img,
        "userSchool": userinfo.school,
        "userSex": userinfo.sex,
        "userAge": userinfo.age
      }
      await store.changeuserinfo(data);
      getuser()
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
  userinfo.img = store.userinfo.userAvatar;
  console.log(store.userinfo);
}
const deletemyforum = async (id) => {
  ElMessageBox({
    title: '是否删除帖子',
    message: '删除后无法回档',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'error',

  }).then(async (status) => {
    if (status == 'confirm') {
      await store1.DeleteMyForum(id)
      await store1.getmyForumList()
      infoList.myForumList = store1.myforum
    }
  }).catch((status) => {
    if (status == 'cancel') {

    }
  })
}
const myshopcarhandle = async (val, id) => {
  console.log(id);
  if (val == 'buy') {
    await store2.BuyOnShopCar(id)
    await store2.getmyShopCarList()
    infoList.myShopCarList = store2.myshopcarlist
    infoList.myShopCarList = [...infoList.myShopCarList]
  } else if (val == 'delete') {
    ElMessageBox({
      title: '是否移除',
      message: '删除后无法回档',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'error',

    }).then(async (status) => {
      if (status == 'confirm') {
        await store2.DeleteOnShopCar(id)
        await store2.getmyShopCarList()
        infoList.myShopCarList = store2.myshopcarlist
        infoList.myShopCarList = [...infoList.myShopCarList]
      }
    }).catch((status) => {
      if (status == 'cancel') {

      }
    })

  }
}
const deleteforumcollection = async (id) => {
  ElMessageBox({
    title: '是否取消收藏',
    message: '取消后无法回档',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'error',

  }).then(async (status) => {
    if (status == 'confirm') {
      await store1.DeleteForumcollect(id)
      await store1.getmyForumCollectList()
      infoList.myForumCollectList = store1.myForumCollectList
    }
  }).catch((status) => {
    if (status == 'cancel') {

    }
  })
}
const ChangeMyForumList = async (list) => {
  console.log();
  // ElMessageBox({
  //   title: '是否取消收藏',
  //   message: '取消后无法回档',
  //   confirmButtonText: '确定',
  //   cancelButtonText: '取消',
  //   type: 'error',
  // }).then(async (status) => {
  //   if (status == 'confirm') {
  //     await store1.DeleteForumcollect(id)
  //     await store1.getmyForumCollectList()
  //     infoList.myForumCollectList = store1.myForumCollectList
  //   }
  // }).catch((status) => {
  //   if (status == 'cancel') {

  //   }
  // })
}
const changeforum = (list) => {
  form.value = list;
  let classtitle = list.t_titile;
  console.log('classtitle', classtitle);
  formclasstitle.source = list.t_source
  formclasstitle.class = classtitle.slice(-2);
  formclasstitle.title = classtitle.slice(0, -3);
  formclasstitle.tid = list.t_id
  formclasstitle.uid = list.t_uid
  dialogFormVisible.value = true
}
async function dialogForm (val) {
  if (val == 'yes') {
    console.log(form.class);
    if (formclasstitle.title != '' && formclasstitle.source != '' && formclasstitle.class != '') {
      let titile = `${formclasstitle.title}#${formclasstitle.class}`
      let data = {
        t_id: formclasstitle.tid,
        t_uid: formclasstitle.uid, //这里要填发布这个帖子的用户ID，用来验证是不是本人（和token中的用户是否一样）
        //后面参数就是用户修改的参数
        t_img: formclasstitle.img,
        t_titile: titile,
        t_source: formclasstitle.text,
        t_status: "正常"
      }
      await store1.AddChangeMyForumList(data)
      formclasstitle.img = '';
      dialogFormVisible.value = false
      await store1.getmyForumList()
      infoList.myForumList = store1.myforum
    } else {
      ElMessage.error('信息不能为空哦！')
    }
  }
  else {
    //是否保存
  }
  // document.getElementsByClassName('box')[0].style.display = "none"
  // document.getElementsByTagName('body')[0].className = '';
  // form.title = '';
  // form.class = '';
  // form.text = '';
  // form.img = '';
  // const store2 = getForumList();
  // dialogFormVisible.value = store2.forumaddshow = false
  dialogFormVisible.value = false
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