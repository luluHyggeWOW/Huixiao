
import { defineStore } from 'pinia'
import { repShopList, repgetMyShopList, reqShopSearchList, repdeleteMyForumList, repaddShop } from '@/api/api';
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { usermain } from '@/store/index'
import { useRoute, useRouter } from "vue-router"

export const getShopList = defineStore('shop', () => {

  const shoplist = ref()
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
  const page = ref(0)
  const $router = useRouter()
  const searchtext = ref({})
  const shopaddshow = ref(false)
  const deleteshopid = ref({})
  let token = localStorage.getItem("huixiao");
  async function getAllList () {
    let result = await repShopList(page.value, token);
    page.value++
    // console.log(result.data);
    if (result.code == 200) {
      shoplist.value = result.data
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
  }
  async function getmyShopList () {
    let result = await repgetMyShopList(token);
    console.log(" getmyShopList", result);
    if (result.code == 200) {
      myshoplist.value = result.data
    }
    else {

    }
  }
  async function deletemyShop () {
    let result = await repdeleteMyForumList(deleteshopid.value, token);
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
      url: [
      ]
    }
    addshoplist.img.forEach(e => {
      data.url.push(e)
    });

    // data = JSON.stringify(data)
    console.log('data', data);
    let result = await repaddShop(data, token);
    console.log("getmyShopList", result);
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
    deleteshopid,
    AddShop,
    firstshoplist
  }

}

)





