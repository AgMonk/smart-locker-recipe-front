<template>
  <div>
    <my-button v-for="(b,i) in buttons" :key="i" v-if="showButton(b)" :text="b.text" @click="b.onClick"/>


    <el-dialog class="center" :visible.sync="visible.update" title="修改" :width="dialogWidth()" >
      <order-form v-if="visible.update" :data="myData" @success="visible.update=false;$emit('change')"/>
    </el-dialog>
    <el-dialog class="center" :visible.sync="visible.assign" title="派单" :width="dialogWidth()">
      <el-table :data="installers" @row-click="assign">
        <el-table-column label="ID" prop="id"/>
        <el-table-column label="姓名" prop="name"/>
        <el-table-column label="区域" prop="area"/>
      </el-table>
    </el-dialog>
    <el-dialog class="center" :visible.sync="visible.abandon" title="撤单" :width="dialogWidth()">
      <el-form>
        <el-form-item label-width="80px" label="原因">
          <el-input v-model="reason"/>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="abandon(1)">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog class="center" :visible.sync="visible.upload" title="照片上传" :width="dialogWidth()">
      <order-upload v-if="visible.upload" :data="myData"/>
    </el-dialog>
    <el-dialog class="center" :visible.sync="visible.inventoryInOrder" title="订单内库存" :width="dialogWidth()">
      <inventory-in-order-form v-if="visible.inventoryInOrder" :data="myData.uuid" />
    </el-dialog>
  </div>
</template>

<script>
import {abandon, assignOrder, complete, confirmOrder, submit} from "../../../assets/js/api/order/order";
import {copyObj, getClientWidth} from "../../../assets/js/utils";
import MyButton from "../my/my-button";
import OrderForm from "./form/order-form";
import {basePage} from "../../../assets/js/api/baseApi";
import OrderUpload from "./order-upload";
import InventoryInOrderForm from "../goods/form/inventory-in-order-form";

export default {
  name: "order-operation",
  components: {InventoryInOrderForm, OrderUpload, OrderForm, MyButton},
  data() {
    return {
      myData: {},
      installers: [],
      reason: undefined,
      visible: {
        update: false,
        assign: false,
        editInventoryMap: false,
        abandon: false,
        upload: false,
        inventoryInOrder: false,
      },
      buttons: [
        //按钮名称    需要的权限     需要的状态   点击事件
        {text: "提交", permissions: 'InstallationOrder:submit:*', status: ['待提交'], onClick: this.submit},
        {text: "修改", permissions: 'InstallationOrder:update:*', status: ['待提交', '已提交'], onClick: this.update},
        {text: "派单", permissions: 'InstallationOrder:assign:*', status: ['已提交'], onClick: this.assign},
        {text: "提审", permissions: 'InstallationOrder:complete:*', status: ['已派单'], onClick: this.complete},
        {text: "修改", permissions: 'InstallationOrder:editInventoryMap:*', status: ['已派单'], onClick: this.editInventoryMap},
        {text: "撤单", permissions: 'InstallationOrder:abandon:*', status: ['已派单'], onClick: this.abandon},
        {text: "上传", permissions: 'InstallationOrder:upload:*', status: ['已派单', '待审核'], onClick: this.upload},
        {text: "确认", permissions: 'InstallationOrder:confirm:*', status: ['待审核'], onClick: this.confirm},

        {text: "SN", permissions: 'InventoryInOrder:query:*', status: ['已派单'], onClick: this.findByOrderUuid},
      ],
    }
  },
  methods: {
    findByOrderUuid(){
      this.visible.inventoryInOrder  = true;
    },
    dialogWidth() {
      return getClientWidth() <= 1 ? "90%" : "50%"
    },
    copy(obj) {
      this.myData = obj ? copyObj(obj) : {};
    },
    showButton(button) {
      return button.status.includes(this.myData.status) && this.$isPermitted(button.permissions);
    },
    submit() {
      if (!confirm("确认提交？")) {
        return
      }
      submit(this.myData.uuid
        , (res) => this.$message(res.message))
        .then(() => this.$emit("change"))
        .catch(e => this.$message(e.message))
    },
    update() {
      this.visible.update = true;
    },
    assign(row) {
      if (!row) {
        //打开dialog
        this.visible.assign = true;
        //  查询安装员列表
        let param = {
          page: 1,
          size: 999,
          condition: {
            hasRoleId: [3],
          }
        }
        basePage("/user/a", param, (res) => this.$message(res.message)).then(res => {
          this.installers = res.data.records;
        }).catch(e => {
          this.$message(e.message)
        })
      } else {
        //  请求派单
        let userId = row.id;
        let uuid = this.myData.uuid;
        if (!confirm("确认派单给 " + row.name + " ?")) {
          return
        }
        assignOrder({userId, uuid}, (res) => this.$message(res.message)).then(() => {
          this.visible.assign = false;
          this.$emit("change")
        }).catch(e => {
          this.$message(e.message)
        })
      }
    },
    complete() {
      if (!confirm("确认提交审核？")) {
        return
      }
      complete(this.myData.uuid, (res) => this.$message(res.message))
        .then(() => this.$emit("change"))
        .catch(e => this.$message(e.message))
    },
    editInventoryMap() {
      this.visible.update = true;
    },
    abandon(m) {
      if (!m) {
        this.visible.abandon = true;
      } else {
        if (!confirm("确认撤单?")) {
          return
        }
        let uuid = this.myData.uuid;
        let reason = this.reason;
        abandon({uuid, reason}, (res) => this.$message(res.message))
          .then(() => {
            this.$emit("change")
            this.visible.abandon = false;
          })
          .catch(e => {
            this.$message(e.message)
          })
      }
    },
    upload() {
      this.visible.upload = true;
    },
    confirm() {
      if (!confirm("确认订单完成？")) {
        return
      }
      confirmOrder(this.myData.uuid, (res) => this.$message(res.message))
        .then(() => this.$emit("change"))
        .catch(e => this.$message(e.message))
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
.center{
  text-align: center
}
</style>
