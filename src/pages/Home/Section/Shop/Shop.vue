<template>
  <Shopadd v-if="shopaddshow"></Shopadd>
  <div class="Shopinfo"
       v-if="Shopinfoshow">
    <div class="colse"
         @click="Shopinfoshow=!Shopinfoshow"><img src="./image/closebtn.png"
           alt=""></div>

    <div class="shopimg">
      <el-carousel trigger="click"
                   height="600px"
                   style="border-radius: 15px 0px 0px 0px ;"
                   ref="carousel">
        <el-carousel-item v-for="(item,index) in shopinfo.urlList"
                          :key="index">
          <img :src="item"
               alt="">
        </el-carousel-item>
      </el-carousel>

    </div>
    <div class="allishopmg">
      <div class="imglist">
        <div v-for="(item,index) in shopinfo.urlList"
             :key="index"
             @click="changeshoplistimg(index)"><img :src="item"
               alt=""></div>

      </div>
    </div>
    <div class="shopuser">
      <div class="userimg">
        <img :src="shopinfo.userUrl"
             alt="">
      </div>
      <div class="username">
        <p>{{shopinfo.userName}}</p>
      </div>
      <span class="p">卖家信息</span>
    </div>

    <div class="shoptitle">
      <hr>
      <p>{{shopinfo.shopName}}</p>
      <span class="p">商品名称</span>
    </div>
    <div class="shoptext">
      <p>{{shopinfo.shopIntuoduct}}</p>
      <span class="p">商品详细</span>
    </div>
    <div class="shopprice">
      <p>￥<span>{{shopinfo.shopPrice}}</span></p>
    </div>
    <div class="shopbtn">
      <div class="shopcar"
           v-if="shopinfoisjoinshopcar"
           @click="handle('joinshopcar',shopinfo.shopId)">
        <img src="./image/shopcar.png"
             alt="">
        <p>加入购物车</p>
      </div>
      <div class="shopcar"
           v-if="!shopinfoisjoinshopcar"
           style="opacity:0.5 ; cursor: no-drop;">
        <img src="./image/shopcar.png"
             alt="">
        <p>已加购物车</p>
      </div>
      <div class="shopbuy"
           v-if="shopinfoisbuy"
           @click="handle('buy',shopinfo.shopId)">
        <img src="./image/shopbuy.png"
             alt="">
        <p>全款拿下</p>
      </div>
      <div class="shopbuy"
           v-if="!shopinfoisbuy"
           style="opacity:0.5 ; cursor: no-drop;">
        <img src="./image/shopbuy.png"
             alt="">
        <p>已经购买</p>
      </div>

    </div>
  </div>

  <div class='box'>
    <div class="shopbox">
      <!-- <div class="bearear">
        <div class="leftear">
          <div class="sear"></div>
        </div>
        <div class="rightear">
          <div class="sear">
          </div>
        </div>
      </div> -->
      <div class="selldiv">
        <div class="title"> <img src="./image/sell.png"
               alt="">
          <p>二手售卖</p>
        </div>
        <div class="text">
          <p>开启它的意义之旅</p>
          <span>更换新主人,寻找新归宿。
            它的生活也会像你的一样多姿多彩！</span>
        </div>

        <img src="./image/bluebear.png"
             alt=""
             class="bluebear">
        <div class="btn"
             @click="Shopaddshowflag">
          <el-button type="primary"
                     style="width:200px; height:50px;font-size:18px;">
            <img src="./image/push.png"
                 alt="">&nbsp;发布商品</el-button>
        </div>
      </div>
      <div class="shopdiv"
           v-for="(list) in ShopList.AllShopList"
           :key="list.shopId"
           @click="clickshopinfo(list)">
        <div class="shopimg">
          <img :src="list.urlList[0]"
               alt="">
        </div>
        <div class="shopuser">
          <div class="shoptitle">
            <p>{{list.shopName}}：<span>{{list.shopIntuoduct}}</span></p>
          </div>
          <div class="userdiv">
            <img :src="list.userUrl"
                 alt=""
                 class="userimg">
            <p class="username">{{list.userName}}</p>
            <div class="price"><span>￥{{list.shopPrice}}</span></div>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script setup>
import { ref, reactive, onMounted, watch, toRaw } from 'vue'
import { getShopList } from '@/store/shop/index'
import Shopadd from './Shopadd/Shopadd.vue'
import debounce from "@/utils/debounce.js";
name: 'Shop'
let ShopList = reactive({
  AllShopList: '',
  NowShopList: '',
  nowPage: 1,
});
let AllShopList = ref({})
let nowPage = ref(1)
let carousel = ref()
const store = getShopList();

const getAlllists = (async () => {
  await store.getAllList()
  ShopList.AllShopList = store.shoplist
  // ShopList.AllShopList.push('')
  ShopList.AllShopList = [...ShopList.AllShopList]
  ShopList.nowPage++
  console.log('ShopList.AllShopList', ShopList.AllShopList);
})
let shopinfo = ref()
let shopinfoisbuy = ref(true)
let shopinfoisjoinshopcar = ref(true)
let Shopinfoshow = ref(false)
let shopaddshow = ref(store.shopaddshow)
const Shopaddshowflag = () => {
  store.shopaddshow = true
}
const clickshopinfo = (info) => {
  shopinfo = info
  Shopinfoshow.value = !Shopinfoshow.value
  shopinfoisbuy.value = true
  shopinfoisjoinshopcar.value = true
  console.log('shopinfo', shopinfo);
}
const getmoreShopList = () => {
  if (document.documentElement.scrollTop + window.innerHeight === document.documentElement.scrollHeight) {
    if (store.isAlllist) {
      getAlllists();
    }

  }
}
const handle = async (val, id) => {
  if (val == 'buy') {
    await store.BuyShop(id)
    shopinfoisbuy.value = false;
  }
  else {
    await store.JoinShopCar(id)
    shopinfoisjoinshopcar.value = false
  }
}

watch([() => store, () => store.shopaddshow, () => store.searchList, () => store.shoplist], (newvalue, oldvalue) => {
  if (typeof (toRaw(newvalue[0]).searchtext.value) == 'string') {
    if (toRaw(newvalue[0]).searchtext.value) {
      ShopList.AllShopList = toRaw(newvalue[0].searchList)
    } else {
      ShopList.AllShopList = toRaw(store.shopalist)
    }
  }
  shopaddshow.value = newvalue[1]
  if (newvalue[2]) {
    ShopList.AllShopList = toRaw(newvalue[0].searchList)
  }
  if (newvalue[3]) {
    console.log('qweqweqw', newvalue[3]);
    // ShopList.AllShopList = toRaw(newvalue[0].shoplist)
  }

})
const changeshoplistimg = (index) => {
  carousel.value.setActiveItem(index)
}
onMounted(() => {
  window.addEventListener('scroll', getmoreShopList, true)
  getAlllists()
  console.log('刚开始');
})
</script>

<style scoped lang="scss" src="./Shop.scss">
</style>