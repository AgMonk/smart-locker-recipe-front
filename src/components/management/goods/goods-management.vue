<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-header>
      <el-button type="primary" @click="visible.add=true;form={}">添加</el-button>
    </el-header>
    <el-main>
      <el-table :data="data.records">
        <el-table-column label="类型" prop="type"/>
        <el-table-column label="型号" prop="model"/>
        <el-table-column label="尺寸">
          <template slot-scope="s">
            <el-tag v-for="item in s.row.sizes" :key="item">{{ item }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="颜色">
          <template slot-scope="s">
            <el-tag v-for="item in s.row.colors" :key="item">{{ item }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="s">
            <el-button type="primary" @click="form=s.row;visible.edit=true">修改</el-button>
            <el-button type="danger" @click="del(s.row.uuid)">删除</el-button>
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
      <goods-form :data="form" @success="visible.add=false;page()"/>
    </el-dialog>
    <el-dialog :visible.sync="visible.edit" title="修改">
      <goods-form :data="form" @success="visible.edit=false;page()"/>
    </el-dialog>
  </el-container>

</template>

<script>
import GoodsForm from "./form/goods-form";
import {baseDel, basePage} from "../../../assets/js/api/baseApi";


export default {
  name: "goods-management",
  components: {GoodsForm},
  data() {
    return {
      prefix: "/Goods",
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

        }
      }
    }
  },
  methods: {
    del(id) {
      if (!confirm("确认删除?")) {
        return
      }
      baseDel(this.prefix, id, (res) => this.$message(res.message)).then(() => this.page())
    },
    page() {
      basePage(this.prefix, this.param.page, undefined).then(res => {
        this.data = res;
      })
    },
  },
  mounted() {
    this.page()
  },
  props: [],
}

</script>

<style scoped>

</style>
