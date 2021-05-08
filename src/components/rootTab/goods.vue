<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <!--    <el-header></el-header>-->
    <el-main>
      <el-tabs v-model="tabs">
        <el-tab-pane label="商品" name="商品">
          <goods-management v-if="tabs==='商品'"/>
        </el-tab-pane>
        <el-tab-pane label="库存" name="库存">
          <inventory-management v-if="tabs==='库存'"/>
        </el-tab-pane>
        <el-tab-pane label="单据" name="单据">
          <!--          <perm-management v-if="tabs==='单据'"  />-->
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <!--    <el-footer></el-footer>-->
  </el-container>

</template>

<script>
import GoodsManagement from "../management/goods/goods-management";
import InventoryManagement from "../management/goods/inventory-management";

export default {
  name: "goods",
  components: {InventoryManagement, GoodsManagement},
  data() {
    return {
      tabs: "商品",
    }
  },
  methods: {},
  mounted() {

  },
  props: [],
}

</script>

<style scoped>

</style>
