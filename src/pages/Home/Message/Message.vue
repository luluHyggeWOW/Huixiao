<template>
  <div class="message">
    <!-- <div class="title">

    </div> -->
    <div class="messagelist" v-for="(item,index) in list">
      <div class="userimgdiv">
        <img class="userimg" :src='(item.img)' alt="">
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
  // $(window).scroll(function () {
  //   var scrollTop = $(this).scrollTop();
  //   var windowHeight = document.body.clientHeight;
  //   console.log(scrollTop, windowHeight);
  //   console.log("div本身的高度:" + $('.message').height());
  //   console.log("距离顶部的的位置" + scrollTop);
  //   //当滚动条滚动到一边的最底部，把需要的div滚动到底部就固定div不让移动了
  //   if (scrollTop > $('#rightdiv').height() - windowHeight) {
  //     console.log(true);
  //     $(".message").css("position", "fixed"); //固定div让其不随着滚动条的滚动而滚动
  //     $(".message").css("bottom", "10px");
  //   }
  //   else {
  //     $(".message").css("position", "static");//恢复div可以跟随滚动条滚动
  //   }
  // })
</script>

<style scoped lang="scss" src="./Message.scss">

</style>