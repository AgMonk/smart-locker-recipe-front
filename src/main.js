// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import "./assets/js/utils"

Vue.prototype.$GLOBAL = {}

/**
 * 判断用户是否有权限
 * @returns {boolean}
 * @param perm
 */
Vue.prototype.$isPermitted = (perm) => {
  let s = perm.split(":");
  let namespace = s[0];
  let action = s[1];
  let target = s[2];
  let roles = Vue.prototype.$GLOBAL.roles;
  if (!roles) {
    return false;
  }
  let permFormat = "{namespace}:{action}:{target}";
  let permissions = roles.flatMap(i=>i.permissions).map(i=>permFormat.format(i));

  if (permissions.includes(permFormat.format({namespace, action, target}))) {
    return true;
  }
  if (permissions.includes(permFormat.format({namespace:"*", action, target}))) {
    return true;
  }
  if (permissions.includes(permFormat.format({namespace:"*", action:"*", target}))) {
    return true;
  }
  if (permissions.includes(permFormat.format({namespace:"*", action, target:"*"}))) {
    return true;
  }
  if (permissions.includes(permFormat.format({namespace, action:"*", target}))) {
    return true;
  }
  if (permissions.includes(permFormat.format({namespace, action, target:"*"}))) {
    return true;
  }
  if (permissions.includes(permFormat.format({namespace, action:"*", target:"*"}))) {
    return true;
  }
  if (permissions.includes(permFormat.format({namespace:"*", action:"*", target:"*"}))) {
    return true;
  }
  return false;
}




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
