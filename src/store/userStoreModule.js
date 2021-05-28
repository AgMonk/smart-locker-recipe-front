import {request} from "../assets/js/AxiosUtils";

export const user = {
  namespaced: true,
  state: {
    loginState: false,
    roles: [],
  },
  actions: {
    updateLoginState({commit, dispatch, state}) {
      console.log("检查登陆状态")
      return new Promise((resolve, reject) => {
        request({
          url: "/user/status"
        }).then(() => {
          state.loginState = true;
          if (!state.loginState) {
            //如果状态从 false 变为 true 更新角色信息
            dispatch("updateUserRoles").then(() => {
              resolve(true)
            })
          } else {
            resolve(true)
          }
        }).catch(() => {
          state.loginState = false;
          reject(false);
        })
      })
    },
    updateUserRoles({state}) {
      return request({
        url: "/role/hasRoles"
      }).then(res => {
        state.roles = res
      })
    },
  },
  getters: {
    permissions(state) {
      return state.roles.flatMap(role => role.permissions)
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
}
