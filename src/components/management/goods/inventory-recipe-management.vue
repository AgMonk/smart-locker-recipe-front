<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
<!--    <el-header>-->
<!--      <el-button type="primary" @click="visible.add=true;form={}">添加</el-button>-->
<!--    </el-header>-->
    <el-main>
      <el-table :data="data.records">
<!--        <el-table-column label="类型" prop="type"/>-->
        <el-table-column label="时间" prop="timestamp.timeString" width="150px"/>
        <el-table-column label="操作员" prop="operatorId" />
        <el-table-column label="类型" prop="type" width="70px" />
        <el-table-column label="工单UUID" prop="orderUuid" />
        <el-table-column label="库存UUID" prop="inventoryUuid" />
        <el-table-column label="数量" prop="amount" width="70px" />
        <el-table-column label="事由" prop="reason" />
<!--        <el-table-column label="操作">-->
<!--          <template slot-scope="s">-->
<!--            <el-button type="primary" @click="form=s.row;visible.edit=true">修改</el-button>-->
<!--            <el-button type="danger" @click="del(s.row.uuid)">删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
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
      <inventory-form :data="form" @success="visible.add=false;page()"/>
    </el-dialog>
    <el-dialog :visible.sync="visible.edit" title="修改">
      <inventory-form :data="form" @success="visible.edit=false;page()"/>
    </el-dialog>
  </el-container>

</template>

<script>
import GoodsForm from "./form/goods-form";
import {baseDel, basePage} from "../../../assets/js/api/baseApi";
import InventoryForm from "./form/inventory-form";


export default {
  name: "inventory-recipe-management",
  components: {InventoryForm, GoodsForm},
  data() {
    return {
      prefix: "/InventoryRecipe",
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
    del(id){
      if (!confirm("确认删除?")){
        return
      }
      baseDel(this.prefix,id,(res) => this.$message(res.message)).then(()=>this.page())
    },
    page() {
      basePage(this.prefix, this.param.page).then(res => {
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
