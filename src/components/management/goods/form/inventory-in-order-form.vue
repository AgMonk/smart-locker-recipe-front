<template>
 <el-table :data="list">
   <el-table-column label="型号" width="60px" prop="model"/>
   <el-table-column label="尺寸" width="50px" prop="size"/>
   <el-table-column label="颜色" width="50px" prop="color"/>
   <el-table-column label="SN"  prop="sn"/>
   <el-table-column label="SN">
     <template slot-scope="s">
<!--       <el-input v-model = "s.row.sn" @focus="$event.currentTarget.select()" @change="updateSn(s.row.uuid,s.row.sn)" />-->
       <el-upload
         :data="{uuid:s.row.uuid}"
         action="/api/InventoryInOrder/uploadSn"
         :on-success="findByOrderUuid"
         >
         <el-button type="primary" size="small" ><i class="el-icon-plus" /></el-button>
       </el-upload>
     </template>
   </el-table-column>


 </el-table>

</template>

<script>
import {findByOrderUuid, updateSn} from "../../../../assets/js/api/order/order";
import {copyObj} from "../../../../assets/js/utils";
import {baseFindAll} from "../../../../assets/js/api/baseApi";

export default {
  name: "inventory-in-order-form",
  data() {
    return {
      myData: {},
      list:[],
      inventory:[],
    }
  },
  methods: {
    copy(obj) {
      this.myData = obj ? copyObj(obj) : [];
    },
    updateSn(uuid,sn) {
      updateSn(uuid,sn,(res) => this.$message(res.message)).catch((res) => this.$message(res.message))
    },
    findByOrderUuid(){
      findByOrderUuid(this.myData).then(res=>{
        this.list = res.data.map(item=>{
          let element = this.inventory.filter(i=>i.uuid===item.inventoryUuid)[0];
          return Object.assign({},element,item);
        })
        console.log(this.list)
      })
    },
    findAllInventory() {
      baseFindAll("/Inventory").then(res => {
        this.inventory = res.data;
        this.findByOrderUuid();
      })
    },
  },
  mounted() {
    this.copy(this.data)
    this.findAllInventory();
  },
  watch: {
    "data": {
      handler: function (e) {
        this.copy(e)
        this.findAllInventory();
      }
    }
  },
  props: ["data"],
}

</script>

<style scoped>

</style>
