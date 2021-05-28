<template>
  <el-form :model="param" label-width="120px">
    <el-form-item label="用户名">
      <el-input v-model="param.username" clearable/>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="param.password" clearable show-password type="password"/>
    </el-form-item>
    <el-form-item label-width="0px">
      <el-button type="danger" @click="param={}">重置</el-button>
      <el-button type="success" @click="login">登陆</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {login} from "../../assets/js/api/user/user-api";
import {clearCache} from "../../assets/js/requestUtils";
import {hasRoles} from "../../assets/js/api/user/role-api";

export default {
  name: "login",
  data() {
    return {
      param: {
        username: undefined,
        password: undefined,
      }
    }
  },
  methods: {
    login() {
      login({
        username: this.param.username,
        password: this.param.password,
      }).then(res => {
        this.$emit("success", res.code === 2000)
        clearCache()
        this.$store.state.user.loginState = res.code === 2000;
        hasRoles().then(r => {
          this.$store.state.user.roles = r.data;
          // this.$router.push("/home")
        })
      })
    }
  },
}
</script>

<style scoped>

</style>
