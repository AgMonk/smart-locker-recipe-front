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
              <el-form-item label="业主姓名">{{ s.row.ownerName }}</el-form-item>
              <el-form-item label="业主电话">{{ s.row.ownerPhone }}</el-form-item>
              <el-form-item label="业主地址">{{ s.row.ownerAddress }}</el-form-item>
              <el-form-item label="备注" v-if="s.row.remark">{{ s.row.remark }}</el-form-item>
              <el-form-item label="撤单备注" v-if="s.row.abandonedRemark">{{ s.row.abandonedRemark }}</el-form-item>
              <el-form-item label="商品">
                <div v-for="(v,k) in s.row.inventoryMap">
                  {{ inventory.filter(i => i.uuid === k)[0].model }}
                  {{ inventory.filter(i => i.uuid === k)[0].color }}
                  {{ inventory.filter(i => i.uuid === k)[0].size }}
                  X {{ v }}
                </div>
              </el-form-item>
            </el-form>

          </template>
        </el-table-column>
        <el-table-column label="时间" prop="timestamp.timeString"/>
        <el-table-column label="状态" prop="status"/>
        <el-table-column label="报装员ID" prop="submitter"/>
        <el-table-column label="安装员ID" prop="installer"/>
        <el-table-column label="业主姓名" prop="ownerName"/>
        <el-table-column label="操作">
          <template slot-scope="s">
            <el-button type="primary"
                       v-if="'待提交'===s.row.status"
                       @click="submit(s.row.uuid)"
            >提交</el-button>
            <el-button type="primary"
                       v-if="['待提交','已提交'].includes(s.row.status)"
                       @click="form=s.row;visible.edit=true"
            >修改
            </el-button>
            <el-button type="primary" v-if="'已提交'===s.row.status"
                       @click="findInstallers();visible.assign=true;param.assign.uuid=s.row.uuid"
            >派单
            </el-button>
            <el-button type="primary"
                       v-if="'已派单'===s.row.status"
                       @click="complete(s.row.uuid)"
            >提审</el-button>
            <el-button type="primary"
                       v-if="'已派单'===s.row.status"
                       @click="form=s.row;visible.edit=true"
            >修改</el-button>
            <el-button type="primary" v-if="'已派单'===s.row.status"
                       @click="visible.abandon=true;param.abandon.uuid=s.row.uuid"
            >撤单</el-button>
            <el-button type="primary" v-if="'待审核'===s.row.status" @click="confirm(s.row.uuid)">确认</el-button>
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
    <el-dialog :visible.sync="visible.add" title="添加">
      <order-form v-if="visible.add" :data="form" @success="visible.add=false;page()"/>
    </el-dialog>
    <el-dialog :visible.sync="visible.edit" title="修改">
      <order-form v-if="visible.edit" :data="form" @success="visible.edit=false;page()"/>
    </el-dialog>

    <el-dialog :visible.sync="visible.assign" title="派单">
      <el-table :data="installers" @row-click="assign">
        <el-table-column label="ID" prop="id"/>
        <el-table-column label="姓名" prop="name"/>
      </el-table>
    </el-dialog>

    <el-dialog :visible.sync="visible.abandon" title="撤单">
      <el-form :model="param.abandon">
        <el-form-item label-width="80px" label="原因">
          <el-input v-model="param.abandon.reason"/>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="abandon">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


  </el-container>

</template>

<script>
import OrderForm from "./form/order-form";
import {baseDel, baseFindAll, basePage} from "../../../assets/js/api/baseApi";
import {abandon, assignOrder, complete, confirmOrder, submit} from "../../../assets/js/api/order/order";


export default {
  name: "order-management",
  components: {OrderForm},
  data() {
    return {
      prefix: "/InstallationOrder",
      visible: {
        add: false,
        edit: false,
        assign: false,
        abandon: false,
        editInventoryMap: false,
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
        },
        assign: {
          userId: undefined,
          uuid: undefined,
        },
        abandon: {
          reason: undefined,
          uuid: undefined,
        },
      },
      inventory: [],
      installers: [],
    }
  },
  methods: {
    findAllInventory() {
      baseFindAll("/Inventory").then(res => {
        this.inventory = res.data;
      })
    },
    abandon() {
      if (!confirm("确认撤单?")) {
        return
      }
      abandon(this.param.abandon, (res) => this.$message(res.message)).then(() => {
        this.page();
        this.visible.abandon = false;
      })
    },
    assign(row) {
      this.param.assign.userId = row.id;
      if (!confirm("确认派单给 " + row.name + " ?")) {
        return
      }
      assignOrder(this.param.assign, (res) => this.$message(res.message)).then(() => {
        this.page();
        this.visible.assign = false;
      })
    },
    submit(uuid) {
      if (!confirm("确认提交？")) {
        return
      }
      submit(uuid, (res) => this.$message(res.message)).then(() => this.page())
    },
    complete(uuid) {
      if (!confirm("确认提交审核？")) {
        return
      }
      complete(uuid, (res) => this.$message(res.message)).then(() => this.page())
    },
    confirm(uuid) {
      if (!confirm("确认订单完成？")) {
        return
      }
      confirmOrder(uuid, (res) => this.$message(res.message)).then(() => this.page())
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
    findInstallers() {
      let param = {
        page: 1,
        size: 999,
        condition: {
          hasRoleId: [3],
        }
      }
      basePage("/user/a", param, (res) => this.$message(res.message)).then(res => {
        this.installers = res.data.records;
      })
    }
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
