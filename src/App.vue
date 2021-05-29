<template>
  <div id="app">
    <!--    <navi/>-->
    <el-container>
<!--      <el-aside v-if="getClientWidth()<2">-->
      <!--        1-->
      <!--      </el-aside>-->
      <el-header style="padding: 0">
        <!--      <el-header v-if="getClientWidth()>=2" style="padding: 0">-->
        <navi-menu v-if="show" :router="router"/>
      </el-header>
      <el-main style="padding: 0">
        <router-view v-if="show"/>
      </el-main>
      <!--      <el-footer>-->
      <!--        测试-->
      <!--      </el-footer>-->
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
    this.$store.dispatch("user/updateLoginState").then(() => this.show = true).catch(() => this.show = true)

    this.$store.dispatch("user/findAllAreas");
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
