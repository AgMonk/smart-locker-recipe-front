<template>
  <el-table :data="list">
    <el-table-column label="型号" prop="model" width="60px"/>
    <el-table-column label="尺寸" prop="size" width="50px"/>
    <el-table-column label="颜色" prop="color" width="50px"/>
    <el-table-column label="SN" prop="sn"/>
    <el-table-column label="SN">
      <template slot-scope="s">
        <el-row>
          <el-col :span="4">
            <el-upload
              :data="{uuid:s.row.uuid}"
              :on-success="findByOrderUuid"
              action="/api/InventoryInOrder/uploadSn"
            >
              <el-button size="small" type="primary"><i class="el-icon-plus"/></el-button>
            </el-upload>
          </el-col>
          <el-col :span="20">
            <el-input v-model="s.row.sn" @change="updateSn(s.row.uuid,s.row.sn)" @focus="$event.currentTarget.select()"/>
          </el-col>
        </el-row>


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
      list: [],
      inventory: [],
    }
  },
  methods: {
    copy(obj) {
      this.myData = obj ? copyObj(obj) : [];
    },
    findByOrderUuid(response) {
      if (!response) {
        return;
      }
      if (response.code === 2000) {
        findByOrderUuid(this.myData).then(res => {
          this.list = res.data.map(item => {
            let element = this.inventory.filter(i => i.uuid === item.inventoryUuid)[0];
            return Object.assign({}, element, item);
          })
          console.log(this.list)
        })
      } else {
        this.$message(response.message)
      }
    },
    findAllInventory() {
      baseFindAll("/Inventory").then(res => {
        this.inventory = res.data;
        this.findByOrderUuid({code: 2000});
      })
    },
    updateSn(uuid, sn) {
      updateSn(uuid, sn, (res) => this.$message(res.message))
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
