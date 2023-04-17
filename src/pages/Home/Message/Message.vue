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
        <p class="username">{{item.name}}</p>
        <p class="lastmessage">{{item.last}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue';
name: 'Message'
const openmessage = () => {

}
let chatflag = ref(false)
const { proxy } = getCurrentInstance()
const openchat = (index, name) => {
  console.log(index, name);
  chatflag.value = !chatflag.value
  proxy.mittBus.emit('chatflag', { flag: chatflag.value, id: index, name: name })

}
proxy.mittBus.on('chatflag', (data) => {
  chatflag.value = data.flag

})
let list = [
  {
    id: 1,
    img: require('./image/neutral.png'),
    name: '某某某1',
    last: '我在食堂干饭我在食堂干饭'
  },
  {
    id: 2,
    img: require('./image/neutral.png'),
    name: '某某某2',
    last: '我在食堂干饭我在食堂干饭'
  },
  {
    id: 3,
    img: require('./image/neutral.png'),
    name: '某某某3',
    last: '我在食堂干饭我在食堂干饭'
  },]


</script>

<style scoped lang="scss" src="./Message.scss">
</style>