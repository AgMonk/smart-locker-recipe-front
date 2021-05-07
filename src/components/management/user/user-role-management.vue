<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-header></el-header>
    <el-main></el-main>
    <el-footer></el-footer>
  </el-container>

</template>

<script>
import {copyObj} from "../../../assets/js/utils";
import {hasRoles} from "../../../assets/js/api/user/user-role-api";

export default {
  name: "user-role-management",
  data() {
    return {
      userId:undefined,
    }
  },
  methods: {
    hasRoles(){
      hasRoles(this.userId,(res) => this.$message(res.message)).then(res=>{
        console.log(res.data)
      })
    }
  },
  mounted() {
    this.userId = this.id;
    this.hasRoles()
  },
  watch: {
    "id": {
      handler: function (e) {
        this.userId = e
        this.hasRoles()
      }
    }
  },
  props: ["id"],
}

</script>

<style scoped>

</style>
