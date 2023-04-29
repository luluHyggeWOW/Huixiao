<template>
  <Shopadd class="Shopadd"
           v-if="Shopaddshow"></Shopadd>
  <div class="Shopinfo"
       v-if="Shopinfoshow">
    <div class="colse"
         @click="Shopinfoshow=!Shopinfoshow"><img src="./image/closebtn.png"
           alt=""></div>
    <div class="shopimg">
      <el-carousel trigger="click"
                   height="800px"
                   style="border-radius: 15px 0px 0px 15px ;">
        <el-carousel-item v-for="item in 4"
                          :key="item">
          <img src="./image/17-panda(1).png"
               alt="">
          {{ item }}
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="shopuser">
      <div class="userimg">
        <img src="./image/gotop.png"
             alt="">
      </div>
      <div class="username">
        <p>问问驱蚊器翁</p>
      </div>
      <span class="p">卖家信息</span>
    </div>

    <div class="shoptitle">
      <hr>
      <p>武切维奇无</p>
      <span class="p">商品名称</span>
    </div>
    <div class="shoptext">
      <p> 武切维奇无qweqweqwqweqwasdadaqqwewwwwww 武切维奇无qweqweqwqweqwasdadaqqwewwwwww 武切维奇无qweqweqwqweqwasdadaqqwewwwwww 武切维奇无qweqweqwqweqwasdadaqqwewwwwww</p>
      <span class="p">商品详细</span>
    </div>
    <div class="shopprice">
      <p>￥<span>99.02</span></p>
    </div>
    <div class="shopcar">
      <img src="./image/shopcar.png"
           alt="">
      <p>加入购物车</p>
    </div>
  </div>
  <div class='box'>
    <div class="shopbox">
      <div class="bearear">
        <div class="leftear">
          <div class="sear"></div>
        </div>
        <div class="rightear">
          <div class="sear">
          </div>
        </div>
      </div>
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
          <img src="./image/Loginbkg.png"
               alt="">
        </div>
        <div class="shopuser">
          <p class="shoptitle">{{list.shopName}}:{{list.shopIntuoduct}}</p>
          <div class="userdiv">
            <img src="./image/gotop.png"
                 alt=""
                 class="userimg">
            <p class="username">问问我企鹅1</p>
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
name: 'Shop'
let ShopList = reactive({
  AllShopList: '',
  NowShopList: '',
});
let list = [

]
let Shopaddshow = ref(false)
let nowPage = ref(1)
async function getAlllist () {
  const store = getShopList();
  await store.getAllList()
  ShopList.AllShopList = store.shoplist
}
let shopinfo
let Shopinfoshow = ref(false)
const store = getShopList()
const Shopaddshowflag = () => {
  Shopaddshow.value = true;
  store.shopaddshow = true
}
const clickshopinfo = (info) => {
  Shopinfoshow.value = !Shopinfoshow.value
  console.log(info);
}
watch(store, (newvalue, oldvalue) => {
  if (Shopaddshow) {
    if (store.searchtext != '') {
      ShopList.NowShopList = toRaw(newvalue.searchList)
    }
    else {
      ShopList.NowShopList = toRaw(store.forumList)
    }
  }
  Shopaddshow.value = store.shopaddshow

})


onMounted(async () => {

  getAlllist()

})

onMounted(async () => {
  getAlllist()

})
</script>

<style scoped lang="scss" src="./Shop.scss">
</style>