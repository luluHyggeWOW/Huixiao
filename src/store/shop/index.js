
import { defineStore } from 'pinia'
import { repShopList, repgetMyShopList, } from '@/api/api';
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus';
import { usermain } from '@/store/index'

export const getShopList = defineStore('shop', () => {

  const shoplist = ref()
  const searchList = ref({})
  const myshop = ref({})
  async function getAllList () {
    let result = await repShopList();
    // console.log(result.data);
    if (result.code == 200) {
      shoplist.value = result.data
    } else {
      ElMessage.error('列表获取失败')
    }

  }
  async function getShopSearchList () {
    let result = await reqSearchList(searchtext.value);
    console.log(result);
    if (result.code == 200) {
      searchList.value = result.data;
    }
    else {

    }
  }
  async function getmyShopList () {
    let token = localStorage.getItem("huixiao");
    let result = await repgetMyShopList(token);
    console.log(result);
    if (result.code == 200) {
      myshop.value = result.data
    }
    else {

    }
  }


  return {
    getShopList,
    shoplist,
    getAllList,
    getmyShopList,
    getShopSearchList
  }

}

)





