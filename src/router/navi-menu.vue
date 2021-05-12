<template>
  <el-menu :default-active="$route.path" active-text-color="#ffd04b"
           background-color="#545c64"
           class="el-menu-demo"
           mode="horizontal"
           text-color="#fff"
           @select="select"
           @open="open"
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
import MyMenuItem from "./my-menu-item";
import {router2} from "./router"

export default {
  name: "navi-menu",
  components: {MyMenuItem},
  data() {
    return {
      router: router2,
    }
  },
  methods: {
    open(index,indexPath){
      console.log(indexPath)
    },
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
    "$route": {
      handler(route) {
        this.router = JSON.parse(JSON.stringify(this.router));
        console.log(1)
      }
    }
  }
}

</script>

<style scoped>

</style>
