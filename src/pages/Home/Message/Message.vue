<template>
  <div class="message">
    <div class="messagelist"
         v-for="(item,index) in list"
         :key=index
         @click="openchat(index,item.name)">
      <div class="userimgdiv"
           @click="openmessage">
        <img class="userimg"
             :src='(item.img)'
             alt="">
        <div class="red"></div>
      </div>
      <div class="namediv">
        <p class="username">{{item.name}}<span class="userdo">-{{item.do}}</span></p>
        <p class="tips"
           ref="tips">{{tipstext}}</p>
        <p class="lastmessage"
           @click="copyemail(item.email,index)"
           @mouseover="tipsMouseOver(index)"
           @mouseout="tipsMouseOut(index)">{{item.email}}</p>
      </div>
    </div>
    <div class="contact">
      -联系-
    </div>
  </div>

</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue';
name: 'Message'
const openmessage = () => {

}
const tips = ref(null)
const tipstext = ref('-点击复制-')
let chatflag = ref(false)
const { proxy } = getCurrentInstance()
const openchat = (index, name) => {
  // console.log(index, name);
  // chatflag.value = !chatflag.value
  // proxy.mittBus.emit('chatflag', { flag: chatflag.value, id: index, name: name })
}
const copyemail = (email, index) => {
  navigator.clipboard.writeText(email).then(function () {
    tipstext.value = '-复制成功-'
  })
}
const tipsMouseOver = (index) => {
  tips.value[index].style.display = 'block';
}
const tipsMouseOut = (index) => {
  tipstext.value = '-点击复制-'
  tips.value[index].style.display = 'none';
}
proxy.mittBus.on('chatflag', (data) => {
  chatflag.value = data.flag

})
let list = [
  {
    id: 1,
    img: require('./image/wzc.jpg'),
    name: '还不明白嘛',
    do: '(后端,运维)',
    email: 'wangzicheng1@qit.edu.cn'
  },
  {
    id: 2,
    img: require('./image/lt.jpg'),
    name: '涛',
    do: '(后端)',
    email: 'longtao@qit.edu.cn'
  },
  {
    id: 3,
    img: require('./image/zmy.jpg'),
    name: '録録',
    do: '(前端)',
    email: 'zhaomengyu@qit.edu.cn'
  },]


</script>

<style scoped lang="scss" src="./Message.scss">
</style>