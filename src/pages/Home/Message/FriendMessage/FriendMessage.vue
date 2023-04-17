<template>
  <div class="box"
       v-if="chatflag">
    <div class="close"
         @click="closechat">X</div>
    <div class="boxleft">
      <div class="chatbox">

      </div>
      <div class="inputbox">
        <el-input v-model="input"
                  type="textarea"
                  placeholder="请输入内容"
                  :rows="7"></el-input>
        <el-button class="pushtext"
                   type="primary">发表</el-button>
      </div>

    </div>
    <div class="
                boxright">
      <div class="friend"> <img src="../image/neutral.png"
             class="userimg">
        <div class="username">
          <p>{{username}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue';
name: 'FriendMessage'
let username = ref()
let userid = ref()
let chatflag = ref(false)
const closechat = () => {
  chatflag.value = !chatflag.value
  proxy.mittBus.emit('chatflag', { flag: chatflag.value })

}
const { proxy } = getCurrentInstance()
proxy.mittBus.on('chatflag', (data) => {
  username = data.name
  if (chatflag.value != data.flag) {
    chatflag.value = data.flag
  }
})

</script>

<style scoped lang="scss" src="./FriendMessage.scss">
</style>