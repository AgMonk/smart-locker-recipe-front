<template>
  <el-table :data="list">
    <el-table-column label="型号" prop="model" width="60px"/>
    <el-table-column label="尺寸" prop="size" width="50px"/>
    <el-table-column label="颜色" prop="color" width="50px"/>
    <el-table-column label="SN">
      <template slot-scope="s">
        <el-input v-model="s.row.sn" @change="updateSn(s.row.uuid,s.row.sn)" @focus="$event.currentTarget.select()"/>
      </template>
    </el-table-column>
    <el-table-column label="SN" width="80px">
      <template slot-scope="s">
        <el-upload
          :data="{uuid:s.row.uuid}"
          :on-success="findByOrderUuid"
          action="/api/InventoryInOrder/uploadSn"
          accept="image/png, image/jpeg"
        >
          <el-button size="small" type="primary"><i class="el-icon-plus"/></el-button>
        </el-upload>
      </template>
    </el-table-column>


  </el-table>

</template>

<script>
import {findByOrderUuid, updateSn} from "../../../../assets/js/api/order/order";
import {copyObj} from "../../../../assets/js/utils";

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
      this.findByOrderUuid({code: 2000})
    },
    findByOrderUuid(response) {
      if (!response) {
        return;
      }
      if (response.code === 2000) {
        findByOrderUuid(this.myData).then(res => {
          this.list = res.map(item => {
            // let element = this.inventory.filter(i => i.uuid === item.inventoryUuid)[0];
            let element = this.inventory[item.inventoryUuid];
            return Object.assign({}, element, item);
          })
          console.log(this.list)
        })
      } else {
        this.$message(response.message)
      }
    },
    updateSn(uuid, sn) {
      updateSn(uuid, sn, (res) => this.$message(res.message))
    },
  },
  mounted() {
    this.copy(this.data)
    this.inventory = this.$store.state.inventory.map
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
