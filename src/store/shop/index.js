
import { defineStore } from 'pinia'
import {
  repShopList, repgetMyShopList, reqShopSearchList, repdeleteMyForumList, repaddShop,
  repBuyShop, repJoinShopCar, repgetMyShopCar, repgetMyBuyShop, repBuyOnShopCar,
  repDeleteOnShopCar, repDeleteMyShop, repgetClassShopList
} from '@/api/api';
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { usermain } from '@/store/index'
import { useRoute, useRouter } from "vue-router"
import debounce from "@/utils/debounce.js";
export const getShopList = defineStore('shop', () => {

  const shoplist = ref()
  const list = []
  const searchList = ref({})
  const myshoplist = ref({})
  const addshoplist = reactive({
    title: '',
    class: '',
    text: '',
    img: [],
    price: '',
  })
  const firstshoplist = ref([])
  const page = ref(1)
  const isAlllist = ref(true)
  const $router = useRouter()
  const searchtext = ref({})
  const shopaddshow = ref(false)
  const myshopcarlist = ref({})
  const getMyBuyShopList = ref({})


  async function getAllList () {
    let result = await repShopList(page.value);
    console.log(page.value, result,);
    if (result.code == 200 || result.code.length > 0) {
      page.value++
      // .push(result.data)
      result.data.forEach(e => {
        list.push(e)
      });
      shoplist.value = list
      console.log('page.value++', page.value);
      console.log('list', list);
      console.log('piniashoplist.value', shoplist.value);
    } else {
      ElMessage.error('列表获取失败')
    }

  }
  async function getShopSearchList () {
    if (searchtext.value != '') {
      let result = await reqShopSearchList(searchtext.value);
      console.log(result);
      if (result.code == 200) {
        searchList.value = result.data;
      }
      else {
      }
    }
    else {
      searchList.value = shoplist.value
    }
  }
  async function getmyShopList () {
    let result = await repgetMyShopList(localStorage.getItem("huixiao"));
    console.log(" getmyShopList", result);
    if (result.code == 200) {
      myshoplist.value = result.data
    }
    else {

    }
  }
  async function getmyShopCarList () {
    let result = await repgetMyShopCar(localStorage.getItem("huixiao"));
    console.log("getMyShopCar", result);
    if (result.code == 200) {
      myshopcarlist.value = result.data
    }
    else {

    }
  }
  async function deletemyShop (deleteshopid) {
    let result = await repDeleteMyShop(deleteshopid, localStorage.getItem("huixiao"));
    console.log(" getmyShopList", result);
    if (result.code == 200) {
      ElMessage.success('删除成功')
    }
    else {
      ElMessage.error('删除成功')
    }
  }
  async function AddShop () {
    let data = {
      shopName: addshoplist.title,
      shopIntuoduct: addshoplist.text,
      shopPrice: addshoplist.price,
      shopClass: addshoplist.class,
      url: [
      ]
    }
    addshoplist.img.forEach(e => {
      data.url.push(e)
    });

    // data = JSON.stringify(data)
    let result = await repaddShop(data, localStorage.getItem("huixiao"));
    if (result == undefined) {
      ElMessage.error('发布失败')
      ElMessageBox({
        title: '登录错误',
        message: '登录过期请重新登录',
        confirmButtonText: '确定',
        type: 'error',
        callback: () => {
          $router.push('/login')
        },
      })
    }
    else {
      if (result.code == 200) {
        ElMessage.success('发布成功')
      }

    }
  }
  async function BuyShop (BuyShopid) {
    let result = await repBuyShop(BuyShopid, localStorage.getItem("huixiao"));
    console.log("BuyShop", result);
    if (result.code == 200) {
      ElMessage.success('购买成功')
    }
  }
  async function BuyOnShopCar (BuyShopid) {
    let result = await repBuyOnShopCar(BuyShopid, localStorage.getItem("huixiao"));
    console.log("BuyShopOnShopCar", result);
    if (result.code == 200) {
      ElMessage.success('购买成功')
    }
    else {
      ElMessage.error('购买失败')
    }
  }
  async function DeleteOnShopCar (BuyShopid) {
    let result = await repDeleteOnShopCar(BuyShopid, localStorage.getItem("huixiao"));
    if (result.code == 200) {
      ElMessage.success('移除成功')
    }
    else {
      ElMessage.error('移除失败')
    }
  }
  async function JoinShopCar (JoinShopCarid) {
    let result = await repJoinShopCar(JoinShopCarid, localStorage.getItem("huixiao"));
    console.log("JoinShopCar", result);

    if (result.code == 200) {
      ElMessage.success('加入购物车成功')


    }
  }
  async function getMyBuyShop () {
    let result = await repgetMyBuyShop(localStorage.getItem("huixiao"));
    console.log("getMyBuyShopList", result);
    if (result.code == 200) {
      getMyBuyShopList.value = result.data
      // ElMessage.success('加入购物车成功')
    }
  }
  async function getClassShopList (title) {
    let result = await repgetClassShopList(title);
    console.log("getClassShopList", result);
    if (result.code == 200) {
      searchList.value = result.data
    }
  }
  function ClassisAll () {
    console.log(1111);
    searchList.value = shoplist.value
    console.log(shoplist.value);
  }

  return {
    getShopList,
    shoplist,
    getAllList,
    getmyShopList,
    getShopSearchList,
    shopaddshow,
    addshoplist,
    searchtext,
    searchList,
    myshoplist,
    deletemyShop,
    AddShop,
    firstshoplist,
    BuyShop,
    JoinShopCar,
    getmyShopCarList,
    myshopcarlist,
    getMyBuyShopList,
    getMyBuyShop,
    BuyOnShopCar,
    DeleteOnShopCar,
    getClassShopList,
    page,
    isAlllist,
    ClassisAll

  }

}

)





