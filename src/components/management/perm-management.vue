<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
<!--    <el-header></el-header>-->
    <el-main style="padding: 5px">
      <el-table :data="data.records">
        <el-table-column label="ID" prop="id" width="50" />
        <el-table-column label="备注" prop="remark" />
        <el-table-column label="权限字符串">
          <template slot-scope="scope">
            {{scope.row.namespace}}:{{scope.row.action}}:{{scope.row.target}}
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
  </el-container>

</template>

<script>
import {copyObj} from "../../assets/js/utils";
import {page} from "../../assets/js/api/user/role-api";
import {basePage} from "../../assets/js/api/baseApi";

export default {
  name: "perm-management",
  data() {
    return {
      prefix:"/permission",
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
      basePage(this.prefix,this.param.page,(res) => this.$message(res.message))
      .then(res=>{
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
