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
        <el-carousel-item v-for="(item,index) in shopinfo.urlList"
                          :key="index">
          <img :src="item"
               alt="">
        </el-carousel-item>
      </el-carousel>
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
           @click="joinshopcar">
        <img src="./image/shopcar.png"
             alt="">
        <p>加入购物车</p>
      </div>
      <div class="shopbuy"
           @click="buy">
        <img src="./image/shopbuy.png"
             alt="">
        <p>全款拿下</p>
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
          <p class="shoptitle">{{list.shopName}}:{{list.shopIntuoduct}}</p>
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
name: 'Shop'
let ShopList = reactive({
  AllShopList: '',
  NowShopList: '',
  nowPage: 1,
});
let list = [

]
let Shopaddshow = ref(false)
let nowPage = ref(1)
async function getAlllist () {
  const store = getShopList();
  await store.getAllList()
  if (ShopList.nowPage == 1) {
    ShopList.AllShopList = store.shoplist
    ShopList.nowPage++
  }
  else {
    store.shoplist.forEach(e => {
      console.log(e);
      ShopList.AllShopList.push(e)
    });
  }
}
let shopinfo = ref()
let Shopinfoshow = ref(false)
const store = getShopList()
const Shopaddshowflag = () => {
  Shopaddshow.value = true;
  store.shopaddshow = true
}
const clickshopinfo = (info) => {
  shopinfo = info
  Shopinfoshow.value = !Shopinfoshow.value

}
const getmoreShopList = () => {
  if (document.documentElement.scrollTop + window.innerHeight === document.documentElement.scrollHeight) {
    console.log("滚动条到底了！");
    getAlllist();
  }
}
watch(store, (newvalue, oldvalue) => {
  if (typeof (toRaw(newvalue).searchtext.value) == 'string') {
    if (toRaw(newvalue).searchtext.value) {
      ShopList.AllShopList = toRaw(newvalue.searchList)
      console.log(ShopList.AllShopList);
      console.log(1);
    } else {
      ShopList.AllShopList = toRaw(store.shoplist)
      console.log(2);
    }
  }
  Shopaddshow.value = store.shopaddshow
})


onMounted(async () => {
  window.addEventListener('scroll', getmoreShopList, true)
  getAlllist()
  console.log(ShopList.AllShopList);
})
</script>

<style scoped lang="scss" src="./Shop.scss">
</style>