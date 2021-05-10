<template>
  <el-form :model="myData" label-width="50px">
    <el-form-item label="ID" v-if="myData.uuid">{{ myData.uuid }}</el-form-item>
    <el-form-item label="名称">
      <el-input v-model="myData.name"/>
    </el-form-item>
    <el-form-item label-width="0">
      <el-button v-if="!myData.id" type="danger" @click="myData={uuid:myData.uuid}">重置</el-button>
      <el-button type="success" @click="save">确认</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
import {baseAdd, baseUpdate} from "../../../../assets/js/api/baseApi";
import {copyObj} from "../../../../assets/js/utils";

export default {
  name: "user-area-form",
  data() {
    return {
      prefix:"/UserArea",
      myData: {
        uuid:undefined,
        name:undefined,
      }
    }
  },
  methods: {
    save(){
      if (this.myData.uuid){
        //  修改
        baseUpdate(this.prefix,this.myData,(res) => this.$message(res.message)).then(res=>{
          this.$emit("success");
        })
      }else{
        //  添加
        baseAdd(this.prefix, this.myData,(res) => this.$message(res.message)).then(res=>{
          this.$emit("success");
        })
      }
    },
    copy(obj) {
      this.myData = obj ? copyObj(obj) : [];
    }
  },
  mounted() {
    this.copy(this.data)
  },
  watch: {
    "data": {
      handler: function (e) {
        this.copy(e)
      }
    }
  },
  props: ["data"],
}

</script>

<style scoped>

</style>
