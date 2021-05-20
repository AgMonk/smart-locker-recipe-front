<!--suppress JSUnresolvedFunction -->
<template>
  <el-container direction="vertical" style="height: 720px">
    <!--  <el-container direction="horizontal">-->
    <el-header>
      <el-button v-if="$isPermitted('InstallationOrder:add:*')" type="primary" @click="visible.add=true;form=undefined">
        添加
      </el-button>
    </el-header>
    <el-main style=" padding: 2px;">
      <el-table :data="data.records">
        <el-table-column type="expand" label="详情">
          <template slot-scope="s">
            <el-form label-width="80px">
              <el-form-item label="业主姓名">{{ s.row.ownerName }}</el-form-item>
              <el-form-item label="业主电话">{{ s.row.ownerPhone }}</el-form-item>
              <el-form-item label="业主地址">{{ s.row.ownerAddress }}</el-form-item>
              <el-form-item label="报装员ID">{{ s.row.submitter }}</el-form-item>
              <el-form-item label="安装员ID">{{ s.row.installer }}</el-form-item>
              <el-form-item label="备注" v-if="s.row.remark">{{ s.row.remark }}</el-form-item>
              <el-form-item label="撤单备注" v-if="s.row.abandonedRemark">{{ s.row.abandonedRemark }}</el-form-item>
              <el-form-item label="商品">
                <div v-for="(v,k) in s.row.inventoryList">
                  {{inventory.filter(i=>i.uuid===v.inventoryUuid)[0].model}}
                  {{inventory.filter(i=>i.uuid===v.inventoryUuid)[0].color}}
                  {{inventory.filter(i=>i.uuid===v.inventoryUuid)[0].size}}
                </div>
              </el-form-item>
              <el-form-item label="照片">
                <order-img :data="s.row.uuid"/>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="时间" prop="timestamp.timeString"/>
        <el-table-column label="状态" prop="status" width="80px">
          <template slot-scope="s">
            <order-status-tag :status="s.row.status"/>
          </template>
        </el-table-column>
        <el-table-column label="业主姓名" prop="ownerName" width="120px"/>
        <el-table-column label="操作">
          <template slot-scope="s">
            <!--操作按钮-->
            <order-operation :data="s.row" @change="page"/>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
        :current-page.sync="param.page.page"
        :page-size.sync="param.page.size"
        :total="data.total"
        layout="prev, pager, next, jumper"
        @current-change="page">
      </el-pagination>
    </el-footer>
    <el-dialog :visible.sync="visible.add" title="添加" :width="dialogWidth()">
      <order-form v-if="visible.add" :data="form" @success="visible.add=false;page()"/>
    </el-dialog>

  </el-container>

</template>

<script>
import OrderForm from "./form/order-form";
import {baseDel, baseFindAll, basePage} from "../../../assets/js/api/baseApi";
import {copyObj, getClientWidth} from "../../../assets/js/utils";
import MyButton from "../my/my-button";
import OrderUpload from "./order-upload";
import OrderImg from "./form/order-img";
import {hasRoles} from "../../../assets/js/api/user/role-api";
import OrderStatusTag from "./order-status-tag";
import OrderOperation from "./order-operation";
import {getStatus} from "../../../assets/js/api/user/user-api";
import {router} from "../../../router/router";


export default {
  name: "order-management",
  components: {OrderOperation, OrderStatusTag, OrderImg, OrderUpload, MyButton, OrderForm},
  data() {
    return {
      prefix: "/InstallationOrder",
      visible: {
        add: false,
      },
      data: {
        records: [],
        total: 50,
      },
      param: {
        page: {
          page: 1,
          size: 10,
          start: undefined,
          end: undefined,
          condition: {
            status: undefined,
          }
        },
      },
      inventory: [],
    }
  },
  methods: {

    dialogWidth() {
      return getClientWidth() <= 1 ? "90%" : "50%"
    },
    findAllInventory() {
      baseFindAll("/Inventory").then(res => {
        this.inventory = res.data;
      })
    },
    del(id) {
      if (!confirm("确认删除?")) {
        return
      }
      baseDel(this.prefix, id, (res) => this.$message(res.message)).then(() => this.page()).catch(e => {
        this.$message(e.message)
      })
    },
    page() {
      basePage(this.prefix, this.param.page, undefined).then(res => {
        this.data = res.data;
      }).catch(e => {
        this.$message(e.message)
      })
    },
  },
  mounted() {
    if (this.$GLOBAL.logged){
      this.findAllInventory()
      this.page()
    }
  },
  props: [],
}

</script>

<style scoped>

</style>
