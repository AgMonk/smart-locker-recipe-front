<template>
  <el-form :model="perm" label-width="80px">
    <el-form-item label="ID" v-if="perm.id">{{ perm.id }}</el-form-item>
    <el-form-item label="备注">
      <el-input v-model="perm.remark"/>
    </el-form-item>
    <el-form-item label="解析">
      <el-input v-model="permString" @change="parsePermString"/>
    </el-form-item>
    <el-form-item label="命名空间">
      <el-input v-model="perm.namespace"/>
    </el-form-item>

    <el-form-item label="操作">
      <el-input v-model="perm.action"/>
    </el-form-item>
    <el-form-item label="目标">
      <el-input v-model="perm.target"/>
    </el-form-item>
    <el-form-item label-width="0">
      <el-button v-if="!perm.id" type="danger" @click="perm={}">重置</el-button>
      <el-button type="success" @click="save">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {baseSave} from "../../../../assets/js/api/baseApi";
import {copyObj} from "../../../../assets/js/utils";

export default {
  name: "perm-form",
  data() {
    return {
      permString:undefined,
      perm: {
        id: undefined,
        remark: undefined,
        namespace: undefined,
        action: undefined,
        target: undefined,
      }
    }
  },
  methods: {
    parsePermString(){
      let s = this.permString.split(":");
      this.perm.namespace = s[0]
      this.perm.action = s[1]
      this.perm.target = s[2]
      this.permString=undefined;
      this.$forceUpdate()
    },
    save(){
      baseSave("/permission",this.perm,(res) => this.$message(res.message))
        .then(res=>{
        this.$emit("success");
      })
    },
  },
  mounted() {
    this.perm = copyObj(this.data)

  },
  watch: {
    "data": {
      handler: function (e) {
        this.perm = copyObj(e)
      }
    }
  },
  props: ["data"],
}

</script>

<style scoped>

</style>
