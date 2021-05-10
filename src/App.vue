<template>
  <div id="app">
    <navi/>
    <router-view/>
  </div>
</template>

<script>
import Navi from "./router/navi";
export default {
  name: 'App',
  components: {Navi}
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
.el-main{
  padding: 5px;
}
</style>
