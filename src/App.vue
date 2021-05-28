<template>
  <div id="app">
    <!--    <navi/>-->
    <el-container>
<!--      <el-aside v-if="getClientWidth()<2">-->
<!--        1-->
<!--      </el-aside>-->
      <el-header  style="padding: 0">
<!--      <el-header v-if="getClientWidth()>=2" style="padding: 0">-->
        <navi-menu :router="router"/>
      </el-header>
      <el-main style="padding: 0">
        <router-view/>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import NaviMenu from "./router/navi-menu";
import {getClientWidth} from "./assets/js/utils";
import {router} from "./router/router";

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
