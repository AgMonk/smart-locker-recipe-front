<template>
  <el-form :model="param" label-width="120px">
    <el-form-item label="旧密码">
      <el-input v-model="param.oldPass" clearable show-password type="password"/>
    </el-form-item>
    <el-form-item label="新密码">
      <el-input v-model="param.newPass" clearable show-password type="password"/>
    </el-form-item>
    <el-form-item label="新密码（确认）">
      <el-input v-model="param.confirm" clearable show-password type="password"/>
      <i v-show="param.newPass!==param.confirm" class="el-icon-close"/>
      <i v-show="param.newPass===param.confirm" class="el-icon-check"/>
    </el-form-item>
    <el-form-item label-width="0">
      <el-button type="danger" @click="param={}">重置</el-button>
      <el-button type="success" @click="editPassword">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {editPassword} from "../../assets/js/api/user-api";

export default {
  name: "password-edit",
  data() {
    return {
      param:{
        oldPass:"",
        newPass:"",
        confirm:"",
      }
    }
  },
  methods: {
    editPassword() {
      this.param.success = (res) => this.$message(res.message)
      editPassword(this.param).then(() => this.$emit("success"))
    }
  },
  mounted() {

  },
  props: [],
}

</script>

<style scoped>

</style>
