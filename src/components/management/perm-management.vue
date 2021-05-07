<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-header>
      <el-button type="primary" @click="visible.add=true;permFormData={}">添加</el-button>
    </el-header>
    <el-main style="padding: 5px">
      <el-table :data="data.records">
        <el-table-column label="ID" prop="id" width="50" />
        <el-table-column label="备注" prop="remark" />
        <el-table-column label="权限字符串">
          <template slot-scope="scope">
            {{scope.row.namespace}}:{{scope.row.action}}:{{scope.row.target}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="permFormData=scope.row;visible.edit=true">修改</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
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

    <el-dialog title="修改权限" :visible.sync="visible.edit">
      <perm-form :data="permFormData" @success="visible.edit=false;page()"/>
    </el-dialog>
    <el-dialog title="添加权限" :visible.sync="visible.add">
      <perm-form :data="permFormData" @success="visible.add=false;page()"/>
    </el-dialog>
  </el-container>

</template>

<script>
import {copyObj} from "../../assets/js/utils";
import {page} from "../../assets/js/api/user/role-api";
import {baseDel, basePage} from "../../assets/js/api/baseApi";
import PermForm from "./form/perm-form";

export default {
  name: "perm-management",
  components: {PermForm},
  data() {
    return {
      prefix:"/permission",
      permFormData: {},
      visible:{
        add:false,
        edit:false,
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
    del(id){
      if (!confirm("确认删除?")){
        return ;
      }
      baseDel(this.prefix, id,(res) => this.$message(res.message)).then(()=>this.page())
    },
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
