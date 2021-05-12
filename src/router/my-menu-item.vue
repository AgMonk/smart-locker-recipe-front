<template>
  <span v-if="!route.redirect" >
    <!--      一级路由-->
      <el-menu-item  v-if="!route.children" :index="(prefix?prefix+'/':'')+route.path">{{ route.label }}</el-menu-item>
    <!--      多级路由-->
    <template v-if="route.children">
      <el-submenu :index="route.path">
        <template slot="title">{{ route.label }}</template>
        <my-menu-item v-for="(item,i) in route.children" :key="i" :route="item" :prefix="route.path"/>
      </el-submenu>
    </template>
  </span>

</template>

<script>
export default {
  name: "my-menu-item",
  data() {
    return {
      myData: {}
    }
  },
  methods: {},
  mounted() {
  },
  props: ["route", "prefix"],
}

</script>

<style scoped>
</style>
