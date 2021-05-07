<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
<!--    <el-header></el-header>-->
    <el-main>
      <el-tabs v-model="tabs">
        <el-tab-pane label="用户" name="用户">
          <user-management />
        </el-tab-pane>
         <el-tab-pane label="角色" name="角色">
        </el-tab-pane>
        <el-tab-pane label="权限" name="权限">
        </el-tab-pane>
      </el-tabs>

    </el-main>
    <el-footer></el-footer>
  </el-container>

</template>

<script>
import UserManagement from "../management/user-management";

export default {
  name: "management",
  components: {UserManagement},
  data() {
    return {
      tabs:"用户",
    }
  },
  methods: {},
  mounted() {

  },
  props: [],
}

</script>

<style scoped>

</style>
