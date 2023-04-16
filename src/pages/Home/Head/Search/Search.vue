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
    <div style="background:red">
      111111
      <img :src="img"
           alt="">
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { getSearchList } from '@/store/search/index'
import { storeToRefs } from 'pinia'
import Axios from "axios";
name: 'Search'
let searchtext = ref('ce')
let img = ref(require('./image/find.png'));
console.log(1, img.value);
// let get = getSearchList();

let SearchList = () => {
  // console.log(searchtext.value);
  // Axios({ url: `http://192.168.43.7:63010/talk/study_talk/search_source?source=${searchtext.value}`, method: 'get' }, {
  //   // params: data
  // }).then(response => {
  //   // console.log(response.data.data);
  //   var jsonObj = JSON.parse(JSON.stringify(response.data.data));
  //   for (var i = 0; i < jsonObj.length; i++) {
  //     // console.log(1);
  //     jsonObj[i].index = 'table' + jsonObj[i].menuId;
  //     console.log(jsonObj[i]);
  //     console.log(jsonObj[i].t_id);
  //     console.log(jsonObj[i].t_img);
  //     img.value = jsonObj[i].t_img
  //     console.log(2, img.value);
  //   }
  // });
  // console.log(3, img.value);

}

onMounted(() => {

})
</script>

<style scoped lang="scss" src="./Search.scss">
</style>