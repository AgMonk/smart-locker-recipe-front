<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
<!--    <el-header></el-header>-->
    <el-main>
      <el-tabs v-model="tabs">
        <el-tab-pane label="用户" name="用户">
          <user-management v-if="tabs==='用户'" />
        </el-tab-pane>
         <el-tab-pane label="角色" name="角色">
           <role-management v-if="tabs==='角色'" />
        </el-tab-pane>
        <el-tab-pane label="权限" name="权限">
          <perm-management v-if="tabs==='权限'"  />
        </el-tab-pane>
      </el-tabs>

    </el-main>
    <el-footer></el-footer>
  </el-container>

</template>

<script>
import UserManagement from "../management/user/user-management";
import RoleManagement from "../management/user/role-management";
import PermManagement from "../management/user/perm-management";

export default {
  name: "management",
  components: {PermManagement, RoleManagement, UserManagement},
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
