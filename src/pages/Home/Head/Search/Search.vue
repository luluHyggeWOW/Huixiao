<template>
  <div class="search">
    <div class="searchlist">

    </div>
    <input type="text"
           v-model="searchtext">
    <!-- <button>搜索</button> -->
    <div class="btn">
      <img src="./image/find.png"
           alt=""
           @click="SearchList">
    </div>
    <!-- <div style="background:red">
      111111
      <img :src="img"
           alt="">
    </div> -->
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { storeToRefs } from 'pinia'
import { getForumList } from '@/store/forum/index'
import { getShopList } from '@/store/shop/index'
import { useRoute, useRouter } from "vue-router"
import { ElMessage, ElMessageBox } from 'element-plus';
import debounce from "@/utils/debounce.js";
name: 'Search'
let searchtext = ref('')

const route = useRoute()
const $router = useRouter()


const SearchList = debounce(async function () {
  if ($router.currentRoute.value.path == '/forum') {
    const store1 = getForumList();
    store1.$patch(state => {
      state.searchtext = searchtext.value
    })
    await store1.getSearchList();
  } else if ($router.currentRoute.value.path == '/news') {
    // const store2 = getForumList();
    // store2.$patch(state => {
    //   state.searchtext = searchtext.value
    // })
    // await store2.getSearchList();
    ElMessage.warning('新闻暂不支持搜索哦')
  }
  else if ($router.currentRoute.value.path == '/shop') {
    const store3 = getShopList();
    store3.$patch(state => {
      state.searchtext = searchtext.value
    })
    await store3.getShopSearchList();
  }
}, 500)




onMounted(() => {

})
</script>

<style scoped lang="scss" src="./Search.scss">
</style>