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


name: 'Search'
let searchtext = ref('ce')

const store = getForumList();
async function SearchList (params) {
  store.$patch(state => {
    state.searchtext = searchtext.value
  })
  await store.getSearchList();
}


onMounted(() => {

})
</script>

<style scoped lang="scss" src="./Search.scss">
</style>