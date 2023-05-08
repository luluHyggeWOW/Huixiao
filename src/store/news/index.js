
import { defineStore } from 'pinia'
import { repgetNewsList, repgetClassNewsList, repgetHotNewsList, repgetNowNewsList } from '@/api/api';
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus';

export const getNewsList = defineStore('news', () => {

  const NewsList = reactive({
    AllList: {},
    NowList: {},
    HotList: {}
  })
  async function getAllNewsList () {
    let result = await repgetNewsList();
    if (result.code == 200) {
      NewsList.AllList = result.data
    } else {

    }
  }
  async function getHotNewsList () {
    let result = await repgetHotNewsList();
    if (result.code == 200) {
      console.log(result.data);
      NewsList.HotList = result.data
    } else {

    }
  }
  async function getNowNewsList () {
    let result = await repgetNowNewsList();
    if (result.code == 200) {
      NewsList.NowList = result.data
    } else {

    }
  }


  return {
    NewsList,
    getAllNewsList,
    getHotNewsList,
    getNowNewsList
  }

}

)





