<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-header>
      <el-button type="primary" @click="visible.add=true;roleFormData={}">添加</el-button>
    </el-header>
    <el-main style="padding: 5px">
      <el-table :data="data.records">
        <el-table-column type="expand" label="权限">
          <template slot-scope="scope">
            <el-table :data="scope.row.permissions" >
              <el-table-column label="备注" prop="remark"/>
              <el-table-column label="权限字符串">
                <template slot-scope="scope">
                  {{ scope.row.namespace }}:{{ scope.row.action }}:{{ scope.row.target }}
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="id" width="50"/>
        <el-table-column label="名称" prop="name"/>
        <el-table-column label="昵称" prop="nickname"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="visible.edit=true;roleFormData=scope.row">修改</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
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
    <el-dialog title="修改角色" :visible.sync="visible.edit">
      <role-form :data="roleFormData" @success="visible.edit=false;page()"/>
    </el-dialog>
    <el-dialog title="添加角色" :visible.sync="visible.add">
      <role-form :data="roleFormData" @success="visible.add=false;page()"/>
    </el-dialog>

  </el-container>

</template>

<script>
import {baseDel, basePage} from "../../../assets/js/api/baseApi";
import RoleForm from "./form/role-form";

export default {
  name: "role-management",
  components: {RoleForm},
  data() {
    return {
      roleFormData: {},
      visible: {
        add: false,
        edit: false,
      },
      prefix: "/role",
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
    del(id){
      if (!confirm("确认删除?")){
        return ;
      }
      baseDel(this.prefix, id,(res) => this.$message(res.message)).then(()=>this.page())
    },
    page() {
      basePage(this.prefix, this.param.page, (res) => this.$message(res.message))
        .then(res => {
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
