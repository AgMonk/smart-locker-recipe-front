<template>
  <div id="app">
<!--    <navi/>-->
    <navi-menu/>
    <router-view/>
  </div>
</template>

<script>
// import Navi from "./router/navi";
import NaviMenu from "./router/navi-menu";
export default {
  name: 'App',
  components: {NaviMenu}
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
