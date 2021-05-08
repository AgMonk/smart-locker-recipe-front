<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
<!--    <el-header></el-header>-->
    <el-main>
      <order-management />
    </el-main>
<!--    <el-footer></el-footer>-->
  </el-container>

</template>

<script>
import OrderManagement from "../management/order/order-management";
export default {
  name: "home",
  components: {OrderManagement},
  data() {
    return {}
  },
  methods: {},
  mounted() {

  },
  props: [],
}

</script>

<style scoped>

</style>
