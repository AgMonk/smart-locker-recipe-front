<template>
  <el-upload
    :file-list="fileList"
    :data="myData"
    action="/api/InstallationOrder/upload"
    class="upload-demo"
    drag
    list-type="picture"
    multiple>
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
</template>

<script>
import {copyObj} from "../../../assets/js/utils";

export default {
  name: "order-upload",
  data() {
    return {
      fileList: [],
      myData: {},
    }
  },
  methods: {
    copy(obj) {
      this.myData = obj ? copyObj(obj) : [];
    },
  },
  mounted() {
    this.copy(this.data)

  },
  watch: {
    "data": {
      handler: function (e) {
        this.copy(e)
      }
    }
  },
  props: ["data"],
}

</script>

<style scoped>

</style>
