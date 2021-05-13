<template>
  <el-menu :default-active="$route.path" active-text-color="#ffd04b"
           background-color="#545c64"
           class="el-menu-demo"
           mode="horizontal"
           text-color="#fff"
           @select="select"
  >
    <!--    <my-menu-item v-for="(route,i) in router" :key="i" :route="route"/>-->
    <el-menu-item v-for="(route,i) in myRouter" :key="i" v-if="!route.children&&!route.redirect" :index="route.path">
      {{ route.label }}
    </el-menu-item>
    <el-submenu  v-for="(route,i) in myRouter" :key="i" :index="route.path" v-if="route.children">
      <template slot="title" >{{ route.label }}</template>
      <el-menu-item
        v-for="(item,i) in route.children"
        v-if="isPermitted(item.requiredPermissions)"
        :key="i"
        :index="route.path+'/'+item.path"
      >{{ item.label }}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import {getStatus} from "../assets/js/api/user/user-api";
import {copyObj} from "../assets/js/utils";

export default {
  name: "navi-menu",
  data() {
    return {
      myRouter:undefined,
      global:this.$GLOBAL
    }
  },
  methods: {
    select(e) {
      if (this.$route.path===e){
        return;
      }
      this.$router.push(e);
    },
    isPermitted(e) {
      return this.$isPermitted(e)
    },
    checkStatus(e){
      if (e.path === "/me") {
        return;
      }
      getStatus()
        .then(()=>{
        })
        .catch(()=>{
          this.$router.push("/me")
        })
    }
  },
  mounted() {
    this.myRouter = copyObj(this.router);
    this.checkStatus(this.$route)
  },
  watch: {
    "$route":{
      handler(e){
        this.checkStatus(e)
      }
    },
    "router":{
      handler(e){
        this.myRouter = copyObj(e)
      }
    }
  },
  props:["router"]
}

</script>

<style scoped>

</style>
