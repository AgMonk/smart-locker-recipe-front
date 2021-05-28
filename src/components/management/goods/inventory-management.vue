<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-header>
      <el-button v-if="$store.getters.isPermitted('Inventory:add:*')" type="primary" @click="visible.add=true;form={}">添加
      </el-button>
    </el-header>
    <el-main>
      <el-table :data="data.records">
        <el-table-column label="UUID" prop="uuid"/>
        <el-table-column label="型号" prop="model"/>
        <el-table-column label="尺寸" prop="size" width="100px" />
        <el-table-column label="颜色" prop="color"  width="70px" />
        <el-table-column label="数量" prop="amount" width="70px" />
        <el-table-column label="操作">
          <template slot-scope="s">
            <el-button v-if="$store.getters.isPermitted('InventoryRecipe:in:*')" type="primary"
                       @click="inventoryUuid=s.row.uuid;visible.recipe=true">添加单据
            </el-button>
            <el-button v-if="$store.getters.isPermitted('Inventory:update:*')" type="primary"
                       @click="form=s.row;visible.edit=true">修改
            </el-button>
            <el-button v-if="$store.getters.isPermitted('Inventory:del:*')" type="danger" @click="del(s.row.uuid)">删除</el-button>
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
      <inventory-form @success="visible.add=false;page()"/>
    </el-dialog>
    <el-dialog :visible.sync="visible.edit" title="修改">
      <inventory-form :data="form" @success="visible.edit=false;page()"/>
    </el-dialog>
     <el-dialog :visible.sync="visible.recipe" title="单据">
      <inventory-recipe-form :data="inventoryUuid" @success="visible.recipe=false;page()"/>
    </el-dialog>

  </el-container>

</template>

<script>
import GoodsForm from "./form/goods-form";
import {baseDel, basePage} from "../../../assets/js/api/baseApi";
import InventoryForm from "./form/inventory-form";
import InventoryRecipeForm from "./form/inventory-recipe-form"


export default {
  name: "inventory-management",
  components: {InventoryForm, GoodsForm,InventoryRecipeForm},
  data() {
    return {
      prefix: "/Inventory",
      inventoryUuid:undefined,
      visible: {
        add: false,
        edit: false,
        recipe: false,
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
      basePage(this.prefix, this.param.page, undefined).then(res => {
        this.data = res.data;
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
