<template>
  <div class="main">
    <!-- <div class="title">
      <span>校园大事件</span>
    </div> -->
    <div class="imghot">
      <div class="gdimg">
        <el-carousel trigger="click"
                     height="400px">
          <el-carousel-item v-for="item in newsimg"
                            :key="item">
            <img :src="item.img">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="hotnews">
        <ul v-for="(list,index) in hotnews"
            :key=index>
          <li>{{list.newstitle}}</li>
        </ul>
      </div>
    </div>

    <div class="allnews">
      <ul v-for="(list,index) in allnews"
          :key=index>
        <li>{{list.newstitle}}</li>
      </ul>
    </div>
  </div>

</template>
<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { defineComponent } from 'vue';
import '@splidejs/vue-splide/css';
name: 'News'
let newsimg = [{
  img: require('./image/Loginbkg.png')
},
{
  img: require('./image/Loginbkg.png')
},
{
  img: require('./image/Loginbkg.png')
},
{
  img: require('./image/Loginbkg.png')
},
{
  img: require('./image/Loginbkg.png')
},
]
let hotnews = [
  {
    newsid: '1',
    newstitle: 'GPT-4 版“贾维斯”诞生'
  },
  {
    newsid: '2',
    newstitle: '微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩'
  },
  {
    newsid: '3',
    newstitle: '微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩'
  },
  {
    newsid: '4',
    newstitle: '微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖'
  }
]
let allnews = [
  {
    newsid: '1',
    newstitle: 'GPT-4 版“贾维斯”诞生'
  },
  {
    newsid: '2',
    newstitle: '微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖'
  },
  {
    newsid: '3',
    newstitle: '微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖'
  },
  {
    newsid: '4',
    newstitle: '微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖'
  }
  ,
  {
    newsid: '4',
    newstitle: '微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖'
  }
  ,
  {
    newsid: '4',
    newstitle: '微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖'
  }
  ,
  {
    newsid: '4',
    newstitle: '微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖'
  }
  ,
  {
    newsid: '4',
    newstitle: '微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖'
  }
  ,
  {
    newsid: '4',
    newstitle: '微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖'
  }
  ,
  {
    newsid: '4',
    newstitle: '微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖'
  }
  ,
  {
    newsid: '4',
    newstitle: '微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖'
  }
  ,
  {
    newsid: '4',
    newstitle: '微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖'
  }

]
</script>

<style scoped lang="scss" src="./News.scss">
</style>