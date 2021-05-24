<template>
  <el-form label-width="80px" :model="myData">
    <el-form-item label="uuid" v-if="myData.uuid">{{ myData.uuid }}</el-form-item>
    <el-form-item label="商品类型"><el-input v-model="myData.type" /></el-form-item>
    <el-form-item label="型号"><el-input v-model="myData.model" /></el-form-item>
    <el-form-item label="尺寸">
        <array-manager :data="myData.sizes" @change="myData.sizes = $event" />
    </el-form-item>
    <el-form-item label="颜色">
      <array-manager :data="myData.colors" @change="myData.colors = $event" />
    </el-form-item>
    <el-form-item label-width="0">
      <el-button type="danger" @click="myData={uuid:myData.uuid}">重置</el-button>
      <el-button type="success" @click="submit" >提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import ArrayManager from "../../../utils/array-manager";
import {copyObj} from "../../../../assets/js/utils";
import {baseAdd, baseUpdate} from "../../../../assets/js/api/baseApi";
export default {
  name: "goods-form",
  components: {ArrayManager},
  data() {
    return {
      prefix: "/Goods",
      myData: {}
    }
  },
  methods: {
    submit(){
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
    copy(obj){
      this.myData = obj?copyObj(obj): {};
    },
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
