<template>
  <div class='box'>
    <div class="shopbox">
      <div class="shopdiv"
           v-for="list in ShopList.AllShopList"
           :key="list.shopId">
        <img src="./image/Loginbkg.png"
             alt=""
             class="shopimg">
        <div class="shopuser">
          <p class="shoptitle">{{list.shopName}}:{{list.shopIntuoduct}}</p>
          <div class="userdiv">
            <img src="./image/gotop.png"
                 alt=""
                 class="userimg">
            <p class="username">问问我企鹅</p>
            <div class="price"><span>￥{{list.shopPrice}}</span></div>
          </div>
        </div>
      </div>
      <div class="selldiv">
        <div class="title"> <img src="./image/sell.png"
               alt="">
          <p>二手售卖</p>
        </div>
        <div></div>
        <div class="shopuser">
          <p class="usertitle">王企鹅二无群请问qqwe而我却二群翁恶趣味无群二群翁无其味无穷</p>
          <div class="userdiv">
            <img src="./image/gotop.png"
                 alt=""
                 class="userimg">
            <p class="username">问问我企鹅</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getShopList } from '@/store/shop/index'
name: 'Shop'
let ShopList = reactive({
  AllShopList: '',
  ShopList: ''
});
let nowPage = ref(1)
async function getAlllist () {
  const store = getShopList();
  await store.getAllList()
  ShopList.AllShopList = store.shoplist

}

onMounted(async () => {
  getAlllist()

})
</script>

<style scoped lang="scss" src="./Shop.scss">
</style>