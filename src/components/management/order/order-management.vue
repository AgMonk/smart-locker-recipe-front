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
                <div v-for="(v,k) in s.row.inventoryMap">
                  {{ inventory.filter(i => i.uuid === k)[0].model }}
                  {{ inventory.filter(i => i.uuid === k)[0].color }}
                  {{ inventory.filter(i => i.uuid === k)[0].size }}
                  X {{ v }}
                </div>
              </el-form-item>
              <el-form-item label="照片">
                <order-img :data="s.row.uuid"/>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="时间" prop="timestamp.timeString"/>
        <el-table-column label="状态" prop="status">
          <template slot-scope="s">
            <el-tag effect="dark" :type="statusTagType(s.row.status)">{{ s.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="业主姓名" prop="ownerName"/>
        <!--        <el-table-column label="报装员ID" prop="submitter"/>-->
        <!--        <el-table-column label="安装员ID" prop="installer"/>-->
        <el-table-column label="操作">
          <template slot-scope="s">
            <my-button v-show="$isPermitted('InstallationOrder:submit:*')" text="提交" v-if="'待提交'===s.row.status" @click="submit(s.row.uuid)"/>
            <my-button v-show="$isPermitted('InstallationOrder:update:*')" text="修改"
                       v-if="['待提交','已提交'].includes(s.row.status)" @click="form=s.row;visible.edit=true"/>
            <my-button v-show="$isPermitted('InstallationOrder:assign:*')" text="派单" v-if="'已提交'===s.row.status"
                       @click="findInstallers();visible.assign=true;param.assign.uuid=s.row.uuid"/>
            <my-button v-show="$isPermitted('InstallationOrder:complete:*')" text="提审" v-if="'已派单'===s.row.status"
                       @click="complete(s.row.uuid)"/>
            <my-button v-show="$isPermitted('InstallationOrder:editInventoryMap:*')" text="修改"
                       v-if="'已派单'===s.row.status" @click="form=s.row;visible.edit=true"/>
            <my-button v-show="$isPermitted('InstallationOrder:abandon:*')" text="撤单" v-if="'已派单'===s.row.status"
                       @click="visible.abandon=true;param.abandon.uuid=s.row.uuid"/>
            <my-button v-show="$isPermitted('InstallationOrder:upload:*')" text="上传"
                       v-if="['已派单','待审核','已完成'].includes(s.row.status)"
                       @click="viewPic(s.row)"/>
            <my-button v-show="$isPermitted('InstallationOrder:confirm:*')" text="确认" v-if="'待审核'===s.row.status"
                       @click="confirm(s.row.uuid)"/>
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
    <el-dialog :visible.sync="visible.edit" title="修改" :width="dialogWidth()">
      <order-form v-if="visible.edit" :data="form" @success="visible.edit=false;page()"/>
    </el-dialog>

    <el-dialog :visible.sync="visible.assign" title="派单" :width="dialogWidth()">
      <el-table :data="installers" @row-click="assign">
        <el-table-column label="ID" prop="id"/>
        <el-table-column label="姓名" prop="name"/>
        <el-table-column label="区域" prop="area"/>
      </el-table>
    </el-dialog>

    <el-dialog :visible.sync="visible.abandon" title="撤单" :width="dialogWidth()">
      <el-form :model="param.abandon">
        <el-form-item label-width="80px" label="原因">
          <el-input v-model="param.abandon.reason"/>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="abandon">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :visible.sync="visible.picture" title="照片上传" :width="dialogWidth()">
      <order-upload v-if="visible.picture" :data="param.upload"/>
    </el-dialog>

  </el-container>

</template>

<script>
import OrderForm from "./form/order-form";
import {baseDel, baseFindAll, basePage} from "../../../assets/js/api/baseApi";
import {abandon, assignOrder, complete, confirmOrder, submit} from "../../../assets/js/api/order/order";
import {getClientWidth} from "../../../assets/js/utils";
import MyButton from "../my/my-button";
import OrderUpload from "./order-upload";
import OrderImg from "./form/order-img";
import {hasRoles} from "../../../assets/js/api/user/role-api";


export default {
  name: "order-management",
  components: {OrderImg, OrderUpload, MyButton, OrderForm},
  data() {
    return {
      prefix: "/InstallationOrder",
      visible: {
        add: false,
        edit: false,
        assign: false,
        abandon: false,
        editInventoryMap: false,
        picture: false,
      },
      form: {},
      data: {
        records: [],
        total: 50,
      },
      picture: {
        upload: true,
        img: [],
      },
      param: {
        upload: {
          uuid: undefined,
        },
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

    dialogWidth() {
      return getClientWidth() <= 1 ? "90%" : "50%"
    },
    statusTagType(status) {
      switch (status) {
        case '待提交':
          return '';
        case '已提交':
          return '';
        case '已派单':
          return 'warning';
        case '待审核':
          return 'info';
        case '已完成':
          return 'success';
        case '已撤单':
          return 'danger';
      }
    },
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
      }).catch(e => {
        this.$message(e.message)
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
      }).catch(e => {
        this.$message(e.message)
      })
    },
    submit(uuid) {
      if (!confirm("确认提交？")) {
        return
      }
      submit(uuid, (res) => this.$message(res.message)).then(() => this.page()).catch(e => {
        this.$message(e.message)
      })
    },
    complete(uuid) {
      if (!confirm("确认提交审核？")) {
        return
      }
      complete(uuid, (res) => this.$message(res.message)).then(() => this.page()).catch(e => {
        this.$message(e.message)
      })
    },
    confirm(uuid) {
      if (!confirm("确认订单完成？")) {
        return
      }
      confirmOrder(uuid, (res) => this.$message(res.message)).then(() => this.page()).catch(e => {
        this.$message(e.message)
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
      }).catch(e => {
        this.$message(e.message)
      })
    },
    viewPic(row) {
      this.visible.picture = true;
      this.param.upload.uuid = row.uuid;
      this.picture.upload = row.status !== '已完成';
    },
  },
  mounted() {
    this.findAllInventory()

    if (!this.GLOBAL.roles) {
      hasRoles().then(res => {
        this.GLOBAL.roles = res.data;
      })
    }else{
      this.page()
    }
  },
  props: [],
}

</script>

<style scoped>

</style>
