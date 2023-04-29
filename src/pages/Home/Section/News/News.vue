<template>
  <div class="main">
    <!-- <div class="title">
      <span>校园大事件</span>
    </div> -->
    <div class="imghot">
      <div class="gdimg">
        <el-carousel trigger="click"
                     height="400px"
                     style="width:600px"
                     ref="showimgindex">
          <el-carousel-item v-for="(item,index) in hotnews"
                            :key="item">
            <div class="hotimgdiv"
                 name="index">
              <img :src="item.img"
                   @click="clcikhotimg(index)">
              <p>{{item.newstitle}}</p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="hotnews">
        <div class="hotnewstitle">
          <img src="./image/hot.png"
               alt="">
          <p>热点新闻</p>
        </div>
        <div v-for="(list,index) in hotnews"
             :key=index
             @click="clcikhottitle(index)">
          <div class="hotnewstext">
            <p>{{list.newstitle}}</p>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="allnews">
      <div class="allnewstitle"><img src="./image/new.png"
             alt="">
        <p>实时新闻</p>
      </div>
      <div v-for="(list,index) in newnews"
           :key=index
           class="allnewstext">
        <div>
          <p>{{list.newstitle}}</p>
        </div>

      </div>
    </div>
    <hr>
    <div class="allnews">
      <div class="allnewstitle"><img src="./image/all.png"
             alt="">
        <p>所有新闻</p>
      </div>
      <div v-for="(list,index) in allnews"
           :key=index
           class="allnewstext">
        <div>
          <p>{{list.newstitle}}</p>
        </div>

      </div>
    </div>
  </div>

</template>
<script setup>
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import { defineComponent, ref, reactive, getCurrentInstance } from 'vue';
import '@splidejs/vue-splide/css';
name: 'News'

let hotnews = [
  {

    newsid: '1',
    newstitle: 'GPT-4 版“贾维斯”诞生',
    img: require('./image/Loginbkg.png')
  },
  {
    newsid: '2',
    newstitle: '微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩',
    img: require('./image/Loginbkg.png')
  },
  {
    newsid: '3',
    newstitle: '微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩',
    img: require('./image/Loginbkg.png')
  },
  {
    newsid: '4',
    newstitle: '微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖',
    img: require('./image/Loginbkg.png')
  },
  {
    newsid: '5',
    newstitle: '微软提出AIGC新“玩法”，图灵奖微软提出AIGC新“玩法”，图灵奖',
    img: require('./image/Loginbkg.png')
  }
]
let newnews = [
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
const showimgindex = ref()
const clcikhotimg = (index) => {
  // showimg = index
}
const clcikhottitle = (index) => {
  showimgindex.value.setActiveItem(index)
}
document.getElementsByClassName('hotnewstext')[0]
console.log(document.getElementsByClassName('hotnewstext'));
document.getElementsByClassName('hotnewstext').onmouseover = function name (params) {
  console.log(11);
}
const inhotnewstext = () => {

}
</script>

<style scoped lang="scss" src="./News.scss">
</style>