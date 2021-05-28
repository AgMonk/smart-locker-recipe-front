import Vue from 'vue';
import Vuex from 'vuex';
import {request} from "../assets/js/AxiosUtils";

Vue.use(Vuex);

// noinspection RedundantIfStatementJS
export const store = new Vuex.Store({
//  共享数据
  state: {
    user: {
      loginState: false,
      roles: [],
    },
  },
  //更新方法
  mutations: {
    updateUserRoles(state) {
      request({
        url: "/role/hasRoles"
      }).then(res => {
        state.user.roles = res
        console.log(res)
      })
    },
    updateLoginState(state) {
      //查询登陆状态
      request({
        url: "/user/status"
      }).then(() => {
        if (!state.user.loginState) {
          //如果状态从 false 变为 true 更新角色信息
          request({
            url: "/role/hasRoles"
          }).then(res => {
            state.user.roles = res
          })
        }
        state.user.loginState = true;

      })
        .catch(() => {
          state.user.loginState = false;
        })
    },
  },
  //渲染方法
  getters: {
    permissions(state) {
      return state.user.roles.flatMap(role => role.permissions)
    },
    isPermitted: (state, getters) => (perm) => {
      let perms = getters.permissions;
      let s = perm.split(":");
      let namespace = s[0];
      let action = s[1];
      let target = s[2];
      if (!perms) {
        return false;
      }
      let permFormat = "{namespace}:{action}:{target}";
      let permissions = perms.map(i => permFormat.format(i));
      if (permissions.includes(permFormat.format({namespace, action, target}))) {
        return true;
      }
      if (permissions.includes(permFormat.format({namespace: "*", action, target}))) {
        return true;
      }
      if (permissions.includes(permFormat.format({namespace: "*", action: "*", target}))) {
        return true;
      }
      if (permissions.includes(permFormat.format({namespace: "*", action, target: "*"}))) {
        return true;
      }
      if (permissions.includes(permFormat.format({namespace, action: "*", target}))) {
        return true;
      }
      if (permissions.includes(permFormat.format({namespace, action, target: "*"}))) {
        return true;
      }
      if (permissions.includes(permFormat.format({namespace, action: "*", target: "*"}))) {
        return true;
      }
      if (permissions.includes(permFormat.format({namespace: "*", action: "*", target: "*"}))) {
        return true;
      }
      return false;
    },
  },
})
