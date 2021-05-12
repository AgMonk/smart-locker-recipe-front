<template>
  <el-menu :default-active="$route.path" active-text-color="#ffd04b"
           background-color="#545c64"
           class="el-menu-demo"
           mode="horizontal"
           text-color="#fff"
           @select="select"
  >
    <!--    <my-menu-item v-for="(route,i) in router" :key="i" :route="route"/>-->
    <el-menu-item v-for="(route,i) in router" :key="i" v-if="!route.children&&!route.redirect" :index="route.path">
      {{ route.label }}
    </el-menu-item>
    <el-submenu  v-for="(route,i) in router" :key="i" :index="route.path" v-if="route.children">
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
import {router2} from "./router"
import {hasRoles} from "../assets/js/api/user/role-api";
import {getStatus} from "../assets/js/api/user/user-api";

export default {
  name: "navi-menu",
  data() {
    return {
      router: router2,
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
  },
  mounted() {

  },
  watch: {
    "$route":{
      handler(e){
        if (e.path === "/me") {
          return;
        }
        getStatus().then(res=>{
          console.log(res)
        }).catch(e=>{
          this.$router.push("/me")
        })
      }
    }
  }
}

</script>

<style scoped>

</style>
