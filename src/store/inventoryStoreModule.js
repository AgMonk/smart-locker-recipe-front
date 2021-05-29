// 库存
// noinspection JSUnresolvedFunction

import {baseFindAll} from "../assets/js/api/baseApi";

let prefix = "/Inventory";

export const inventory = {
  namespaced: true,
  state: {
    map: {},
    mapTimestamp: 0,//上次请求库存Map的时间
  },
  mutations: {},
  actions: {
    method({dispatch, commit, state}) {

    },
    findAll({state}) {
      let now = new Date().getTime() / 1000 / 60;
      // 每5分钟请求一次全部数据
      if (now - state.mapTimestamp < 5) {
        return new Promise((resolve) => {
          resolve();
        });
      }
      return baseFindAll(prefix).then(res => {
        if (res) {
          state.mapTimestamp = now;
          res.forEach(i => state.map[i.uuid] = i);
        }
      })
    },

  },
  getters: {},
}
