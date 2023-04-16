
import { defineStore } from 'pinia'
import { reqSearchList } from '@/api/api';
import axios from 'axios';

export const getForumList = defineStore('getlist', {
  state: () => ({
    searchList: {},
  }),
  getters: {
    // 当前形参 state 当前仓库中的state 并非大仓库中的那个state
    forumsList (state) {
      //.如果服务器数据回来了是一个数组 加入网络不给力没网 返回的是undefind
      return state.searchList || [];
    },


  },

  actions: {
    //获取search模块数据
    async getList (params = {}) {
      //当前这reqSearchList这个函数在调用获取服务器数据的时候 至少传递一个参数（空对象)
      //params形参 是当用户派发action的时候 第二个参数传递过来的 至少是一个空对象
      let result = await reqSearchList(params);
      // let result = await axios.get('http://jsonplaceholder.typicode.com/posts')
      // console.log(result);
      // this.searchList = result;
      this.searchList = result;
      // if (result.code == 200) {
      //   this.searchList = result.data;
      //   this.a = 2
      // }
      // else {
      //   this.a = 3
      // }
    }

  }

})


export default getForumList