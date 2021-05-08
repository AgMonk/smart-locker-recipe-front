<template>
  <el-form label-width="80px" :model="myData">
    <el-form-item label="业主姓名">
      <el-input v-model="myData.ownerName"/>
    </el-form-item>
    <el-form-item label="业主电话">
      <el-input v-model="myData.ownerPhone"/>
    </el-form-item>
    <el-form-item label="业主地址">
      <el-input v-model="myData.ownerAddress"/>
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="myData.remark"/>
    </el-form-item>
    <el-form-item label="商品">
      <el-select v-model="addGoods" placeholder="添加商品" @change="add">
        <el-option v-for="item in aInventory"
                   :value="item.uuid"
                   :key="item.uuid"
                   :label="item.model+' '+item.color+' '+item.size+' X '+item.amount"
        />
      </el-select>
      <div v-for="(v,k) in myData.inventoryMap">
        {{inventory.filter(i=>i.uuid===k)[0].model}}
        {{inventory.filter(i=>i.uuid===k)[0].color}}
        {{inventory.filter(i=>i.uuid===k)[0].size}}
        X {{v}}

        <el-button size="small" @click="splice(k)"><i class="el-icon-minus"/></el-button>
      </div>
    </el-form-item>
    <el-form-item label-width="0">
      <el-button type="danger" @click="myData={inventoryMap:{}}">重置</el-button>
      <el-button type="success" @click="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import ArrayManager from "../../../utils/array-manager";
import {copyObj} from "../../../../assets/js/utils";
import {baseAdd, baseFindAll, baseUpdate} from "../../../../assets/js/api/baseApi";

export default {
  name: "order-form",
  components: {ArrayManager},
  data() {
    return {
      prefix: "/InstallationOrder",
      addGoods: undefined,
      myData: {
        ownerName: undefined,
        ownerPhone: undefined,
        ownerAddress: undefined,
        remark: undefined,
        inventoryMap: {},
      },
      inventory: [],
      aInventory: [],
    }
  },
  methods: {
    splice(uuid){
      if (this.myData.inventoryMap[uuid]>1) {
        this.myData.inventoryMap[uuid] = this.myData.inventoryMap[uuid] - 1
      }else{
        delete this.myData.inventoryMap[uuid]
      }
      this.$forceUpdate()
    },
    add() {
      if (!this.myData.inventoryMap[this.addGoods]) {
        this.myData.inventoryMap[this.addGoods] = 1
      } else {
        this.myData.inventoryMap[this.addGoods] = this.myData.inventoryMap[this.addGoods] + 1
      }
      this.addGoods = undefined
    },
    findAllInventory() {
      baseFindAll("/Inventory").then(res => {
        this.inventory = res.data;
        this.aInventory = this.inventory.filter(i => i.amount > 0);
      })
    },
    submit() {
      if (this.myData.uuid) {
        //  修改
        baseUpdate(this.prefix, this.myData, (res) => this.$message(res.message)).then(res => {
          this.$emit("success");
        })
      } else {
        //  添加
        baseAdd(this.prefix, this.myData, (res) => this.$message(res.message)).then(res => {
          this.$emit("success");
        })
      }
    },
    copy(obj) {
      this.myData = obj ? copyObj(obj) : {inventoryMap: {},};
    },
  },
  mounted() {
    this.copy(this.data)
    console.log(this.myData)
    this.findAllInventory()
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
