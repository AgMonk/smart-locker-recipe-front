import Vue from 'vue';
import Vuex from 'vuex';
import {user} from "./userStoreModule"
import {inventory} from "./inventoryStoreModule";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {user, inventory},
//  共享数据
  state: {},
  //更新方法
  mutations: {},
  actions: {},
  //渲染方法
})
