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
      this.$store.dispatch("user/login", this.param).then(() => {
        this.$message.success("登陆成功")
      })
    }
  },
}
</script>

<style scoped>

</style>
