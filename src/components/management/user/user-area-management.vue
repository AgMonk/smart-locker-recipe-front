<!--用户区域-->
<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-header>
      <el-button type="primary" @click="visible.add=true;form={}">添加</el-button>
    </el-header>
    <el-main style="padding: 5px">
      <el-table :data="data.records">
        <el-table-column label="UUID" prop="uuid" />
        <el-table-column label="地区" prop="name" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="visible.edit=true;form=scope.row">修改</el-button>
            <el-button type="danger" @click="del(scope.row.uuid)">删除</el-button>
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
    <el-dialog title="修改区域" :visible.sync="visible.edit">
      <user-area-form :data="form" @success="visible.edit=false;page()"/>
    </el-dialog>
    <el-dialog title="添加区域" :visible.sync="visible.add">
      <user-area-form :data="form" @success="visible.add=false;page()"/>
    </el-dialog>
  </el-container>

</template>

<script>
import {baseDel, basePage} from "../../../assets/js/api/baseApi";
import UserAreaForm from "./form/user-area-form";

export default {
  name: "user-area-management",
  components: {UserAreaForm},
  data() {
    return {
      prefix:"/UserArea",
      form:undefined,
      visible: {
        add: false,
        edit: false,
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
    page(){
      basePage(this.prefix,this.param.page,(res) => this.$message(res.message)).then(res=>{
        this.data = res.data;
      })
    },
    del(id){
      baseDel(this.prefix,id,(res) => this.$message(res.message)).then(()=>this.page())
    },
  },
  mounted() {
    this.page()
  },
}

</script>

<style scoped>

</style>
