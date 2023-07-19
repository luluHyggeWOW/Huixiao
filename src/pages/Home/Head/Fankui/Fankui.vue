<template>
  <div class="box">
    <div class="closebox" @click="closebox"><img src="./image/closebtn.png" alt=""></div>
    <div class="top">
      <p>你的反馈与解决是我们最大的鼓励</p>
    </div>
    <div class="title">
      <el-tabs type="border-card" @tab-click="basicbtn" v-model="activeName"
        style="height:800px ;width:1178px;border-radius: 0px 0px 15px 15px;">
        <el-tab-pane label="提出/修改反馈" name="pushfankui">
          <template #label><span style=" " font-size=30px;>提出/修改反馈</span>
          </template>
        </el-tab-pane>
        <el-tab-pane label="所有反馈" name="allfankui"></el-tab-pane>
        <el-tab-pane label="我的反馈" name="myfankui"></el-tab-pane>
        <el-tab-pane label="所有解决方案" name="allsolution"></el-tab-pane>
        <el-tab-pane label="我的解决方案" name="mysolution"></el-tab-pane>
        <!-- <el-tab-pane label="提出解决方案"
                     name="pushsolution"></el-tab-pane> -->
      </el-tabs>

    </div>
    <div class="infobox">

      <div class="myinfo allfankui" v-if=infopage.allfankui>
        <div class="all">
          <div class="div" v-for="(list,index) in infoList.allfankuiList" :key="index">
            <div class="img">
              <img :src="list.userHead" alt="">
            </div>

            <div class="title">
              <p>{{list.userName}}</p>
              <div class="text">
                <p class="weizhi">{{list.hlocation}}</p>
                <span class="laiyuan">{{list.hsource}}</span>
              </div>

            </div>
            <div class="ForumCollect handle " @click="gosolution(list)">
              <el-button type="primary" style="width:120px;height:40px;cursor: pointer;"><img
                  src="./image/collected.png" alt="">
                <p>解答</p>
              </el-button>

            </div>
            <div class="time">
              <p>反馈时间：<br>{{list.hdata}}</p>
            </div>
          </div>
        </div>

      </div>
      <div class="myinfo myfankui" v-if=infopage.myfankui>
        <div class="all">
          <div class="div" v-for="(list,index) in infoList.myfankuiList" :key="index">
            <div class="img">
              <img :src="list.userHead" alt="">
            </div>

            <div class="title">
              <p>{{list.userName}}</p>
              <div class="text">
                <p class="weizhi">{{list.hlocation}}</p>
                <span class="laiyuan">{{list.hsource}}</span>
              </div>

            </div>

            <div class="handle myfankui">
              <el-button type="danger" style="width:100px;height:40px;" @click="deletemyfankui(list.hid)"><img
                  src="./image/delement.png" alt="">
                <p>删除</p>
              </el-button>

              <el-button type="primary" style="width:100px;height:40px;cursor: pointer;" @click="changemyfankui(list)">
                <img src="./image/change.png" alt="">
                <p>修改</p>
              </el-button>
            </div>
            <div class="time">
              <p>反馈时间：<br>{{list.hdata}}</p>
            </div>
          </div>

        </div>

      </div>
      <div class="myinfo allsolution" v-if=infopage.allsolution>
        <div class="all">
          <div class="div" v-for="(list,index) in infoList.allsolutionList" :key="index">
            <div class="img">
              <img src="./image/xiuli.png" alt="">
            </div>

            <div class="title">
              <p>{{list.hsoveperson}}</p>
              <div class="text">
                <!-- <p class="weizhi">{{list.hlocation}}</p>
                <p class="weizhi">:</p> -->
                <span class="laiyuan">{{list.hsfa}}</span>
              </div>

            </div>

            <!-- <div class="handle myfankui">
              <el-button type="danger"
                         style="width:100px;height:40px;"
                         @click="deletemyfankui(list.shopId)"><img src="./image/delement.png"
                     alt="">
                <p>删除</p>
              </el-button>

              <el-button type="primary"
                         style="width:100px;height:40px;cursor: pointer;"
                         @click="deleteforumcollection(list)">
                <img src="./image/collected.png"
                     alt="">
                <p>修改</p>
              </el-button>
            </div> -->
            <div class="time">
              <p>解决时间：<br>{{list.hstime}}</p>
            </div>
          </div>

        </div>

      </div>
      <div class="myinfo mysolution" v-if=infopage.mysolution>
        <div class="all">
          <div class="div" v-for="(list,index) in infoList.mysolutionList" :key="index">
            <div class="img">
              <img src="./image/xiuli.png" alt="">
            </div>

            <div class="title">
              <p>{{list.hsoveperson}}</p>
              <div class="text">
                <!-- <p class="weizhi">{{list.hlocation}}</p>
                <p class="weizhi">:</p> -->
                <span class="laiyuan">{{list.hsfa}}</span>
              </div>

            </div>

            <div class="handle">

            </div>
            <div class="time">
              <p>解决时间：<br>{{list.hstime}}</p>
            </div>
          </div>
        </div>

      </div>
      <div class="besicinfo" v-if=infopage.pushsolution>

        <div class="div">
          <p>反馈人：</p>
          <div class="input">
            <p class="solutioninfo">{{solutioninfo.name}}</p>
          </div>
        </div>
        <div class="div">
          <p>反馈地点：</p>
          <div class="input">
            <p class="solutioninfo">{{solutioninfo.location}}</p>
          </div>
        </div>
        <div class="div">
          <p>反馈详细：</p>
          <div class="input" style=" width:500px;">
            <p class="solutioninfo">{{solutioninfo.text}}</p>
          </div>
        </div>
        <div class="div">
          <p>反馈时间：</p>
          <div class="input" style=" width:200px;">
            <p class="solutioninfo" style=" width:200px;">{{solutioninfo.time}}</p>
          </div>
        </div>
        <div class="div">
          <p>解决：</p>
          <div class="input" style=" width:500px;">
            <el-input type="textarea" placeholder="" v-model="solutioninfo.solution" maxlength="100" show-word-limit>
            </el-input>
          </div>
        </div>

      </div>
      <div class="besicinfo" v-if=infopage.pushfankui>
        <div class="div">
          <p>反馈地点：</p>
          <div class="input">
            <el-input v-model="fankuiinfo.location" placeholder="" maxlength=10></el-input>
          </div>
        </div>
        <div class="div">
          <p>反馈详细：</p>
          <div class="input" style=" width:500px;">
            <el-input type="textarea" placeholder="" v-model="fankuiinfo.text" maxlength="50" show-word-limit>
            </el-input>
          </div>
        </div>

      </div>
    </div>
    <div class="btn">
      <el-button style="width:150px;height:50px;font-size:20px;" @click="qvxiaoinfo()" v-if="btnshow1">取消</el-button>
      <el-button type="primary" style="width:150px;height:50px;font-size:20px;" @click="pushinfo()"
        v-if="btnshow">提交</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted, toRaw } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { submituser } from '@/store/user/index'
import { usermain } from '@/store/index'
import { ElMessage, ElMessageBox } from 'element-plus';
import debounce from "@/utils/debounce.js";
name: 'Userinfo'
const route = useRoute();
const $router = useRouter();
const activeName = ref('pushfankui');
const fankuiinfo = reactive({
  id: '',
  location: '',
  text: '',
})
const solutioninfo = reactive({
  id: '',
  location: '',
  text: '',
  solution: '',
  name: '',
  time: ''
})
const btnshow = ref(true)
const btnshow1 = ref(false)
const infopage = reactive({
  allfankui: false,
  myfankui: false,
  allsolution: false,
  mysolution: false,
  pushfankui: true,
  pushsolution: false
})
const infoList = reactive({
  allfankuiList: '',
  myfankuiList: '',
  allsolutionList: '',
  mysolutionList: '',
})

const handleClose = () => {

}
const store = submituser();
const store2 = usermain();
//分类选择
const options = reactive([
  {
    value: '选项1',
    label: '黄金糕',
  },
  {
    value: '选项2',
    label: '双皮奶',
  },
  {
    value: '选项3',
    label: '蚵仔煎',
  },
  {
    value: '选项4',
    label: '龙须面',
  },
  {
    value: '选项5',
    label: '北京烤鸭',
  },

],)
const value = ref('')
const form = ref({})
const formclasstitle = reactive({
  class: '',
  title: '',
  source: '',
  img: '',
  tid: '',
  uid: '',
})
const basicbtn = async (tab, event) => {
  infopage.allfankui = false
  infopage.myfankui = false
  infopage.allsolution = false
  infopage.mysolution = false
  infopage.pushfankui = false
  infopage.pushsolution = false
  btnshow.value = false
  btnshow1.value = false
  if (tab.props.name == 'allfankui') {
    infopage.allfankui = true
    getallfankui()
  }
  else if (tab.props.name == 'myfankui') {
    infopage.myfankui = true
    getmyfankui()
  }
  else if (tab.props.name == 'allsolution') {
    infopage.allsolution = true
    getallsolution()
  }
  else if (tab.props.name == 'mysolution') {
    infopage.mysolution = true
    getmysolution()
  }
  else if (tab.props.name == 'pushfankui') {
    infopage.pushfankui = true
    btnshow.value = true
    gopushfankui()
  }
  else if (tab.props.name == 'pushsolution') {
    infopage.pushsolution = true
    btnshow.value = true
    btnshow1.value = true
    gopushsolution()
  }
}
const getAllfankui = async () => {
  await store.getAllfankui();
  infoList.allfankuiList = store.allfankui
  infoList.allfankuiList = [...infoList.allfankuiList]
}
const gosolution = (list) => {
  infopage.allfankui = false
  infopage.pushsolution = true
  btnshow.value = true
  btnshow1.value = true
  console.log(list);
  solutioninfo.location = list.hlocation
  solutioninfo.name = list.userName
  solutioninfo.text = list.hsource
  solutioninfo.id = list.hid
  solutioninfo.time = list.hdata
}
const changemyfankui = (list) => {
  console.log(list);
  infopage.myfankui = false
  infopage.pushfankui = true
  btnshow.value = true
  btnshow1.value = true
  console.log(list);
  fankuiinfo.location = list.hlocation
  fankuiinfo.text = list.hsource
  if (list.hid) {
    fankuiinfo.id = list.hid
  }

}
let getallsolution = debounce(async () => {
  store.getAllsolution();
  infoList.allsolutionList = store.allsolution
}, 500)
let getallfankui = debounce(async () => {
  await store.getAllfankui();
  infoList.allfankuiList = store.allfankui
  infoList.allfankuiList = [...infoList.allfankuiList]
}, 500)
let getmyfankui = debounce(async () => {
  await store.getMyfankui();
  infoList.myfankuiList = store.myfankui
  console.log(infoList.myfankuiList);
}, 500)
let getmysolution = debounce(async () => {
  store.getMysolution();
  infoList.mysolutionList = store.mysolution
}, 500)
let gopushfankui = debounce(async () => {
}, 500)
let gopushsolution = debounce(async () => {
}, 500)
const closebox = () => {
  document.body.style.overflow = 'auto';
  $router.go(-1)
}
async function pushinfo () {
  if (infopage.pushsolution) {
    ElMessageBox({
      title: '提出/修改反馈',
      message: '确认提交反馈吗',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async (status) => {
      console.log(solutioninfo.solution, status);
      if (status == 'confirm') {
        if (solutioninfo.solution && solutioninfo.id) {
          console.log("yes");
          let data = {
            "h_id": solutioninfo.id,
            "hsoveperson": store2.userinfo.userName,
            "hstate": "1",
            "hsfa": solutioninfo.solution,
          }
          console.log('data', data);
          await store.pushsolution(data);
          getallfankui()
          infopage.allfankui = true
          infopage.pushsolution = false
        }
        else {
          ElMessage.error('解决信息不能为空 请到所有反馈选择反馈信息')
        }
      }

    }).catch((status) => {
      if (status == 'cancel') {

      }
    })
  } else if (infopage.pushfankui) {
    ElMessageBox({
      title: '提交/修改反馈',
      message: '提交后无法回档',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async (status) => {
      if (fankuiinfo.text != '' && fankuiinfo.location != "") {
        if (fankuiinfo.id == '') {
          let data = {
            hsource: fankuiinfo.text,
            hlocation: fankuiinfo.location,
          }
          await store.changefankui(data);
        }
        else {
          let data = {
            Hid: fankuiinfo.id,
            hSource: fankuiinfo.text,
            hLocation: fankuiinfo.location,
          }
          await store.changefankui(data);
        }
        getallfankui()
        infopage.pushfankui = false
        infopage.allfankui = true

        fankuiinfo.id = '';
        fankuiinfo.location = '';
        fankuiinfo.text = '';
      }
    }).catch((status) => {
      if (status == 'cancel') {

      }
    })

  }
}
async function qvxiaoinfo () {
  if (infopage.pushfankui) {
    ElMessageBox({
      title: '解决方案',
      message: '确认取消解决方案吗 取消后无法保存',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async (status) => {
      getallfankui()
      infopage.pushfankui = false
      infopage.allfankui = true
      fankuiinfo.id = '';
      fankuiinfo.location = '';
      fankuiinfo.text = '';
      btnshow.value = false
      btnshow1.value = false
    }).catch((status) => {
      if (status == 'cancel') {

      }
    })
  } else if (infopage.pushsolution) {
    ElMessageBox({
      title: '修改反馈',
      message: '确认取消修改反馈吗 取消后无法保存',
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async (status) => {
      solutioninfo.id = '';
      solutioninfo.location = '';
      solutioninfo.text = '';
      solutioninfo.solution = '';
      solutioninfo.time = '';
      solutioninfo.name = '';
      getallsolution()
      infopage.allfankui = true
      infopage.myfankui = false
      infopage.allsolution = false
      infopage.mysolution = false
      infopage.pushfankui = false
      infopage.pushsolution = false
      btnshow.value = false
      btnshow1.value = false
    }).catch((status) => {
      if (status == 'cancel') {

      }
    })
  }
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
const deletemyfankui = async (hid) => {
  ElMessageBox({
    title: '是否删除反馈',
    message: '删除后无法回档',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'error',
  }).then(async (status) => {
    if (status == 'confirm') {
      console.log(hid);
      await store.deleteMyfankui(hid)
      getmyfankui()
    } ElMessage
  }).catch((status) => {
    if (status == 'cancel') {

    }
  })
}
const deletemysolution = async (id) => {
  ElMessageBox({
    title: '是否删除解决方案',
    message: '删除后无法回档',
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'error',

  }).then(async (status) => {
    if (status == 'confirm') {
      await store.deleteMysolution(id)
      getmysolution()
    }
  }).catch((status) => {
    if (status == 'cancel') {

    }
  })
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



onMounted(() => {
  // location.reload()
})

</script>

<style scoped lang="scss" src="./Fankui.scss">
</style>
<style lang="scss">
.el-tabs__item {
  height: 70px;
  font-size: 20px;
  font-weight: 600;
}
</style>