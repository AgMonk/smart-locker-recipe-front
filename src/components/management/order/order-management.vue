<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-header>
      <el-button type="primary" @click="visible.add=true;form=undefined">添加</el-button>
    </el-header>
    <el-main>
      <el-table :data="data.records">
        <el-table-column type="expand" label="详情">
          <template slot-scope="s">
            <el-form label-width="80px">
              <el-form-item label="业主姓名">{{s.row.ownerName}}</el-form-item>
              <el-form-item label="业主电话">{{s.row.ownerPhone}}</el-form-item>
              <el-form-item label="业主地址">{{s.row.ownerAddress}}</el-form-item>
              <el-form-item label="商品">
                <div v-for="(v,k) in s.row.inventoryMap">
                  {{inventory.filter(i=>i.uuid===k)[0].model}}
                  {{inventory.filter(i=>i.uuid===k)[0].color}}
                  {{inventory.filter(i=>i.uuid===k)[0].size}}
                  X {{v}}
                </div>
              </el-form-item>
            </el-form>

          </template>
        </el-table-column>
        <el-table-column label="时间" prop="timestamp.timeString"/>
        <el-table-column label="状态" prop="status"/>
        <el-table-column label="报装员ID" prop="submitter"/>
        <el-table-column label="安装员ID" prop="installer"/>
<!--        <el-table-column label="业主姓名" prop="ownerName" width="100px"/>-->
<!--        <el-table-column label="业主电话" prop="ownerPhone" width="120px"/>-->
<!--        <el-table-column label="业主地址" prop="ownerAddress"/>-->
        <el-table-column label="备注" prop="remark"/>
        <el-table-column label="撤单备注" prop="abandonedRemark"/>
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
    <el-dialog :visible.sync="visible.add" title="添加">
      <order-form v-if="visible.add" :data="form" @success="visible.add=false;page()"/>
    </el-dialog>
    <el-dialog :visible.sync="visible.edit" title="修改">
      <order-form v-if="visible.edit" :data="form" @success="visible.edit=false;page()"/>
    </el-dialog>
  </el-container>

</template>

<script>
import OrderForm from "./form/order-form";
import {baseDel, baseFindAll, basePage} from "../../../assets/js/api/baseApi";


export default {
  name: "order-management",
  components: {OrderForm},
  data() {
    return {
      prefix: "/InstallationOrder",
      visible: {
        add: false,
        edit: false,
      },
      form: {},
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
        }
      },
      inventory: [],

    }
  },
  methods: {
    findAllInventory() {
      baseFindAll("/Inventory").then(res => {
        this.inventory = res.data;
      })
    },
    del(id) {
      if (!confirm("确认删除?")) {
        return
      }
      baseDel(this.prefix, id, (res) => this.$message(res.message)).then(() => this.page())
    },
    page() {
      basePage(this.prefix, this.param.page, (res) => this.$message(res.message)).then(res => {
        this.data = res.data;
      })
    },
  },
  mounted() {
    this.page()
    this.findAllInventory()
  },
  props: [],
}

</script>

<style scoped>

</style>
