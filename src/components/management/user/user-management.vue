<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <!--    <el-header></el-header>-->
    <el-main style=" padding: 2px;">
      <el-table :data="data.records">
        <el-table-column label="ID" prop="id" width="50"/>
        <el-table-column label="姓名" prop="name"/>
        <el-table-column label="用户名" prop="username"/>
        <el-table-column label="电话" prop="phone"/>
        <el-table-column label="注册时间" prop="createdAt.timeString"/>
        <el-table-column label="可用状态" prop="available">
          <template slot-scope="s">
            {{ s.row.available ? "正常" : "停用" }}
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template slot-scope="s">
            <el-button type="primary" @click="visible.userRole=true;userRoleId=s.row.id">角色</el-button>
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
    <el-dialog :visible.sync="visible.userRole" width="70%">
      <user-role-management :id="userRoleId"/>
    </el-dialog>
  </el-container>

</template>

<script>
import {copyObj} from "../../../assets/js/utils";
import {page} from "../../../assets/js/api/user/user-api";
import UserRoleManagement from "./user-role-management";

export default {
  name: "user-management",
  components: {UserRoleManagement},
  data() {
    return {
      userRoleId: undefined,
      visible: {
        userRole: false
      },
      data: {
        records: [],
        total: 50,
      },
      param: {
        page: {
          page: 1,
          size: 10,

        }
      }
    }
  },
  methods: {
    page() {
      let p = copyObj(this.param.page)
      p.success = (res) => this.$message(res.message)
      page(p).then(res => {
        let d = res;
        this.data.records = d.records;
        this.data.total = d.total;
      })
    }
  },
  mounted() {
    this.page();
  },
  props: [],
}

</script>

<style scoped>

</style>
