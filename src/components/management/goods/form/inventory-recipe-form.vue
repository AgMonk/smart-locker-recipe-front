<template>
  <el-form label-width="80px" :model="myData">
    <el-form-item label="库存UUID" >{{ myData.inventoryUuid }}</el-form-item>
    <el-form-item label="事由"><el-input v-model="myData.reason" /></el-form-item>
    <el-form-item label="数量"><el-input v-model="myData.amount" /></el-form-item>
    <el-form-item label-width="0">
      <el-button type="danger" @click="myData={inventoryUuid:myData.inventoryUuid}">重置</el-button>
      <el-button type="success" @click="inRecipe" >入库</el-button>
      <el-button type="success" @click="outRecipe" >出库</el-button>
      <el-button type="success" @click="checkRecipe" >盘点</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import ArrayManager from "../../../utils/array-manager";
import {request} from "../../../../assets/js/AxiosUtils";

export default {
  name: "inventory-recipe-form",
  components: {ArrayManager},
  data() {
    return {
      prefix: "/InventoryRecipe",
      myData: {
        inventoryUuid: undefined,
        reason: undefined,
        amount:undefined,
      }
    }
  },
  methods: {
    inRecipe(){
      request({
        url: "/" + this.prefix + "/in",
        data: this.myData,
      }).then(() => this.$emit("success")
      )
    },
    outRecipe(){
      request({
        url:"/"+this.prefix+"/out",
        data:this.myData,
      })  .then(()=>this.$emit("success"))
    },
    checkRecipe(){
      request({
        url:"/"+this.prefix+"/check",
        data:this.myData,
      })  .then(()=>this.$emit("success"))
    },
    copy(obj){
      console.log("复制" + obj)
      this.myData.inventoryUuid = obj
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
