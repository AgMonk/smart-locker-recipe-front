<template>
  <el-form :model="param" label-width="80px">
    <el-form-item label="姓名">
      <el-input v-model="param.name"/>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="param.phone"/>
    </el-form-item>
    <el-form-item label-width="0">
      <el-button type="danger" @click="param={}">重置</el-button>
      <el-button type="success" @click="editUserInfo">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {editUserInfo} from "../../assets/js/api/user-api";

export default {
  name: "user-info-edit",
  data() {
    return {
      param: {
        phone: "",
        name: "",
      },
    }
  },
  methods: {
    editUserInfo() {
      this.param.success = (res) => this.$message(res.message)
      editUserInfo(this.param).then(() => this.$emit("success"))
    }
  },
  mounted() {
    this.param = this.data;
  },
  watch: {
    "data": {
      handler: function (d) {
        this.param = d;
      }
    }
  },
  props: ["data"],
}

</script>

<style scoped>

</style>
