<template>
  <el-form :model="param" label-width="120px">
    <el-form-item label="用户名">
      <el-input v-model="param.username" clearable/>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="param.password" clearable show-password type="password"/>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="param.name" clearable/>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="param.phone" clearable/>
    </el-form-item>
    <el-form-item label="区域">
      <el-select v-model="param.area" style="width: 100%">
        <el-option v-for="(item,i) in areas"
                   :value="item"
                   :label="item"
                   :key="i"
        />
      </el-select>
    </el-form-item>


    <el-form-item label-width="0px">
      <el-button type="danger" @click="param={}">重置</el-button>
      <el-button type="success" @click="reg">注册</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

import {reg} from "../../assets/js/api/user/user-api";
import {baseFindAll} from "../../assets/js/api/baseApi";

export default {
  name: "reg",
  data() {
    return {
      param: {
        username: "",
        password: "",
        name: "",
        phone: "",
        area: "",
      },
      areas:[],
    }
  },
  methods: {
    reg() {
      this.param.success = (res) => this.$message(res.message)
      reg(this.param).then(() => this.$emit("success")).catch(e=>{
        this.$message(e.data[0])
      })
    },
    findAllAreas(){
      baseFindAll("/UserArea").then(res => this.areas = res);
    },
  },
  mounted() {
    this.findAllAreas();
  },
}
</script>

<style scoped>

</style>
