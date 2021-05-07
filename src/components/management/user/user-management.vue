<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
<!--    <el-header></el-header>-->
    <el-main style="padding: 5px">
      <el-table :data="data.records">
        <el-table-column label="ID" prop="id" width="50" />
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="用户名" prop="username" />
        <el-table-column label="电话" prop="phone" />
        <el-table-column label="注册时间" prop="createdAt.timeString" />
        <el-table-column label="可用状态" prop="available" >
          <template slot-scope="s">
            {{s.row.available?"正常":"停用"}}
          </template>
        </el-table-column>

      </el-table>
    </el-main>
    <el-footer>
      <el-pagination
        :current-page="param.page.page"
        :page-size.sync="param.page.size"
        :total="data.total"
        layout="prev, pager, next, jumper"
        @current-change="page">
      </el-pagination>
    </el-footer>
    <el-dialog :visible.sync="visible.userRole">
      <user-role-management :id="1" />
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
      visible:{
        userRole:true
      },
      data:{
        records:[],
        total:50,
      },
      param:{
        page:{
          page:1,
          size:10,

        }
      }
    }
  },
  methods: {
    page(){
      let p = copyObj(this.param.page)
      p.success = (res) => this.$message(res.message)
      page(p).then(res=>{
        let d = res.data;
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
