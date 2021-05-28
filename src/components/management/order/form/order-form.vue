<template>
  <el-form label-width="80px" :model="myData">
    <el-form-item label="业主姓名">
      <el-input v-model="myData.ownerName" v-if="myData.status !== '已派单'" />
      <span v-if="myData.status === '已派单'">{{myData.ownerName}}</span>
    </el-form-item>
    <el-form-item label="业主电话">
      <el-input v-model="myData.ownerPhone" v-if="myData.status !== '已派单'"/>
      <span v-if="myData.status === '已派单'">{{myData.ownerPhone}}</span>
    </el-form-item>
    <el-form-item label="地区">
      <el-select v-model="myData.area" style="width: 100%">
        <el-option v-for="(item,i) in areas"
                   :value="item"
                   :label="item"
                   :key="i"
                   />
      </el-select>
      <span v-if="myData.status === '已派单'">{{myData.area}}</span>
    </el-form-item>
    <el-form-item label="业主地址">
      <el-input v-model="myData.ownerAddress" v-if="myData.status !== '已派单'"/>
      <span v-if="myData.status === '已派单'">{{myData.ownerAddress}}</span>
    </el-form-item>

    <el-form-item label="备注">
      <el-input v-model="myData.remark" v-if="myData.status !== '已派单'"/>
      <span v-if="myData.status === '已派单'">{{myData.remark}}</span>
    </el-form-item>
    <el-form-item label="商品" >
      <el-select v-model="addGoods" placeholder="添加商品" @change="add" style="width: 100%">
        <el-option v-for="item in aInventory"
                   :value="item.uuid"
                   :key="item.uuid"
                   :label="item.model+' '+item.color+' '+item.size+' X '+item.amount"
        />
      </el-select>
      <div v-for="(v,k) in myData.inventoryList" v-if="inventory.filter(i=>i.uuid===v.inventoryUuid)[0]">
        {{inventory.filter(i=>i.uuid===v.inventoryUuid)[0].model}}
        {{inventory.filter(i=>i.uuid===v.inventoryUuid)[0].color}}
        {{inventory.filter(i=>i.uuid===v.inventoryUuid)[0].size}}

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
import {editInventory} from "../../../../assets/js/api/order/order";

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
        area: undefined,
        remark: undefined,
        inventoryList: {},
      },
      inventory: [],
      aInventory: [],
      areas:[],
    }
  },
  methods: {
    findAllAreas(){
      baseFindAll("/UserArea").then(res => this.areas = res);
    },
    splice(i){
      this.myData.inventoryList.splice(i,1)
      this.$forceUpdate()
    },
    add() {
      if (!this.myData.inventoryList) {
        this.myData.inventoryList = [];
      }
      this.myData.inventoryList.push({inventoryUuid:this.addGoods})
      // if (!this.myData.inventoryMap[this.addGoods]) {
      //   this.myData.inventoryMap[this.addGoods] = 1
      // } else {
      //   this.myData.inventoryMap[this.addGoods] = this.myData.inventoryMap[this.addGoods] + 1
      // }
      this.addGoods = undefined
    },
    findAllInventory() {
      baseFindAll("/Inventory").then(res => {
        this.inventory = res;
        this.aInventory = this.inventory.filter(i => i.amount > 0);
      })
    },
    submit() {
      if (this.myData.uuid) {
        //  修改
        if (this.myData.status === '已派单') {
          editInventory(this.myData, (res) => this.$message(res.message)).then(() => {
            this.$emit("success");
          })
        }else {
          baseUpdate(this.prefix, this.myData, (res) => this.$message(res.message)).then(() => {
            this.$emit("success");
          })
        }
      } else {
        //  添加
        baseAdd(this.prefix, this.myData, (res) => this.$message(res.message)).then(() => {
          this.$emit("success");
        }).catch(e => {
          this.$message(e.data[0])
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
    this.findAllAreas();
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
