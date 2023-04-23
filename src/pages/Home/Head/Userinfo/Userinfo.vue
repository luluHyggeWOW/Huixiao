<template>

  <div class="box">
    <div class="closebox"
         @click="closebox"><img src="./image/closebtn.png"
           alt=""></div>
    <div class="top">
      <img src="./image/neutral.png"
           alt="">
      <p @click="qq">奥术大师多群</p>

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

      </el-tabs>

    </div>
    <div class="infobox">
      <div class="besicinfo"
           v-if=infopage.basicinfo>
        <div class="div">
          <p>用户昵称：</p>
          <div class="input">
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="div">
          <p>邮箱：</p>
          <div class="input">
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="div">
          <p>性别：</p>
          <el-radio v-model="radio1"
                    label="1">男</el-radio>
          <el-radio v-model="radio1"
                    label="2">女</el-radio>
        </div>
        <div class="div">
          <p>年龄：</p>
          <div class="input">
            <el-input v-model="input"
                      placeholder="请输入内容"></el-input>

          </div>
        </div>
        <div class="div">
          <p>个人简介：</p>
          <div class="input"
               style=" width:500px;">
            <el-input type="textarea"
                      placeholder="请输入内容"
                      v-model="textarea"
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
            <el-input v-model="input"
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
             v-for="(list) in Forum"
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
import { ref, reactive, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { getForumList } from '@/store/forum/index'
name: 'Userinfo'
const route = useRoute();
const $router = useRouter();
const activeName = ref('basic');
const unsrinfo = reactive({
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
const Forum = ref({})
const store = getForumList();
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
    store.getmyforum()
    console.log(store.myforum);
    Forum.value = store.myforum
  }
  else {

  }
  // if ()
}


const closebox = () => {
  document.body.style.overflow = 'auto';
  $router.push('/news')
}
const pushinfo = () => {

}



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