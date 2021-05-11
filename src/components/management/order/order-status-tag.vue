<template>
  <el-tag effect="dark" :type="statusTagType(status)">{{ status }}</el-tag>
</template>

<script>
export default {
  name: "order-status-tag",
  data() {
    return {
      myData: {}
    }
  },
  methods: {
    statusTagType(status) {
      switch (status) {
        case '待提交':
          return '';
        case '已提交':
          return '';
        case '已派单':
          return 'warning';
        case '待审核':
          return 'info';
        case '已完成':
          return 'success';
        case '已撤单':
          return 'danger';
      }
    },
  },
  props: ["status"],
}

</script>

<style scoped>

</style>
