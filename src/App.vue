<template>
  <div id="app">
    <!--    <navi/>-->
    <el-container>
<!--      <el-aside v-if="getClientWidth()<2">-->
<!--        1-->
<!--      </el-aside>-->
      <el-header  style="padding: 0">
<!--      <el-header v-if="getClientWidth()>=2" style="padding: 0">-->
        <navi-menu v-if="show" :router="router"/>
      </el-header>
      <el-main style="padding: 0">
        <router-view v-if="show"/>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import NaviMenu from "./router/navi-menu";
import {copyObj, getClientWidth} from "./assets/js/utils";
import {router} from "./router/router";
import {getStatus} from "./assets/js/api/user/user-api";
import {hasRoles} from "./assets/js/api/user/role-api";

export default {
  name: 'App',
  components: {NaviMenu,router},
  methods: {
    getClientWidth: getClientWidth
  },
  data(){
    return {
      router,
      show:false,
    }
  },
  mounted() {

    console.log("刷新")
    getStatus()
      .then(()=>{
        this.$GLOBAL.logged = true;
        hasRoles().then(r=> {
          this.$GLOBAL.roles = r.data;
          this.show=true;
        })
      }).catch(()=>{
      this.show=true;
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
