<template>
  <div class="message">
    <!-- <div class="title">

    </div> -->
    <div class="messagelist" v-for="(item,index) in list">
      <div class="userimgdiv">
        <img class="userimg" :src='(item.img)' alt="">
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
  import { ref, reactive } from 'vue';
  name: 'Message'
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
  $(() => {
    $('.message').hover(() => {
      $('.message').animate({ width: "250px" })
      $('.message').css("animation-direction", 'normal')
    }, () => {
      $('.message').animate({ width: "80px" })
    })
  })

</script>

<style scoped lang="scss" src="./Message.scss">

</style>