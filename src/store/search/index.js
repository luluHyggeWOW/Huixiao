import Vue from "vue";
import Vuex from "vuex";
import { defineStore } from 'pinia'
import { reqSearchList } from '@/api/api';
export const getSearchList = defineStore('counter', {
  state: () => ({

    searchList: {}
  }),
  // const { name, doubleCount } = storeToRefs(store);
  //mutations 修改state的唯一手段
  // store.$patch({

  // })
  // const mutations = {
  //   GETSEARCHLIST (state, searchList) {
  //     state.searchList = searchList
  //   }
  // };
  // //计算属性 在项目中 为了简化数据而生
  // //在项目当中 getters主要作用是 简化仓库中的数据（简化数据而生）
  // //可以吧我们将来在组件当中需要用的数据简化一下 将来
  getters: {
    // 当前形参 state 当前仓库中的state 并非大仓库中的那个state
    goodsList (state) {
      //.如果服务器数据回来了是一个数组 加入网络不给力没网 返回的是undefind
      return state.searchList.goodsList || [];
    },
    trademarkList () {
      return state.searchList.trademarkList;
    },
    attrsList () {
      return state.searchList.attrsList;
    }


  },
  actions: {
    //获取search模块数据
    async getSearchList (params = {}) {
      //当前这reqSearchList这个函数在调用获取服务器数据的时候 至少传递一个参数（空对象)
      //params形参 是当用户派发action的时候 第二个参数传递过来的 至少是一个空对象
      let result = await reqSearchList(params);
      if (result.code == 200) {
        state.searchList = result.data.searchList
      }
    }

  },
})


