<template>

  <nav v-if="navshow">
    <div class="topimg">
      <img src="./image/bearear2.png"
           alt="">
    </div>
    <el-menu class="el-menu-vertical-demo">
      <el-menu-item @click="gotoclass('全部')">
        <div class="top">
          <img src="./image/classify.png"
               alt="">
          <!-- <p>分类</p> -->
        </div>
      </el-menu-item>
    </el-menu>
    <el-menu class="el-menu-vertical-demo"
             v-for="(list,index) in allclass"
             :key="index">
      <el-menu-item index="list.id"
                    @click="gotoclass(list.title)">
        <!-- <template #title> -->
        <el-tag style="width:100px;height:40px; font-size:20px">
          <p>{{list.title}}</p>
        </el-tag>
        <!-- </template> -->
      </el-menu-item>

    </el-menu>
    <div class="bottomimg">
      <img src="./image/bearbottom.png"
           alt="">
    </div>
  </nav>
</template>

<script setup>
import { ref, reactive, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { getForumList } from '@/store/forum/index'
import { getShopList } from '@/store/shop/index'
name: 'Nav';

let allclass = reactive([
  // {
  //   title: "热点新闻",
  // },
  // {
  //   title: "实时新闻",
  // },
  // {
  //   title: "全部新闻",
  // },
])
const route = useRoute();
let navshow = ref(true);
const changeclass = (path) => {
  if (path == '/news') {
    allclass = [
      {
        title: "热点新闻",
      },
      {
        title: "实时新闻",
      },
      {
        title: "所有新闻",
      },
    ]
    navshow.value = false
    setTimeout(() => {
      navshow.value = true;
    }, 0);
  }
  else if (path == '/shop') {
    allclass = [

      {
        title: "电子产品",
      },
      {
        title: "日用品",
      },
      {
        title: "书本",
      }
      ,
      {
        title: "服装",
      }
      ,
      {
        title: "其他",
      }
    ]
    navshow.value = false
    setTimeout(() => {
      navshow.value = true;
    }, 0);
  }
  else if (path == '/forum') {
    allclass = [
      {
        title: "生活",
      },
      {
        title: "学习",
      },
      {
        title: "美食",
      }
      ,
      {
        title: "娱乐",
      }
      ,
      {
        title: "其他",
      }
    ]
    navshow.value = false
    setTimeout(() => {
      navshow.value = true;
    }, 0);
  }
  else {
    navshow.value = true;
    setTimeout(() => {
      navshow.value = false;
    }, 0);
  }


}
const store1 = getForumList()
const store2 = getShopList()
const gotoclass = async (title) => {
  if (route.path == '/shop') {
    store2.page = 1;
    if (title == '全部') {
      await store2.ClassisAll()
      store2.isAlllist = true
    }
    else {
      await store2.getClassShopList(title)
      store2.isAlllist = false
    }

  }
  else if (route.path == '/forum') {
    if (title == '全部') {
      console.log(111);
      await store1.ClassisAll()
      store1.isAlllist = true
    }
    else if (title == '生活') {
      await store1.getClassForumList('Tlife')
      store1.isAlllist = false
    }
    else if (title == '美食') {
      await store1.getClassForumList('Tfood')
      store1.isAlllist = false
    }
    else if (title == '娱乐') {
      await store1.getClassForumList('TFun')
      store1.isAlllist = false
    }
    else if (title == '学习') {
      await store1.getClassForumList('Tstudy')
      store1.isAlllist = false
    }
    else if (title == '其他') {
      await store1.getClassForumList('Tother')
      store1.isAlllist = false
    }

  }
  else if (route.path == '/news') {
    if (title == '全部' || title == '所有新闻') {
      // await store2.getAllList()
      let element = document.getElementsByClassName('allnews all')[0]
      let rect = element.getBoundingClientRect();
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      let topPosition = rect.top + scrollTop - 100;
      window.scrollTo(0, topPosition);
    }
    else if (title == '热点新闻') {
      console.log(document.getElementsByClassName('imghot')[0]);

      window.scrollTo(0, 0);
    }
    else if (title == '实时新闻') {
      let element = document.getElementsByClassName('allnews now')[0]
      let rect = element.getBoundingClientRect();
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      let topPosition = rect.top + scrollTop - 100;
      window.scrollTo(0, topPosition);

    }
  }
}
watch(() => route.path, (newvalue, oldvalue) => {
  changeclass(newvalue)
})

onMounted(() => {
  changeclass(route.path)
})
</script>

<style scoped lang="scss" src="./Nav.scss">
</style>