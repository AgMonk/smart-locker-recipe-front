<template>
  <div
    v-if="srcList.length>0"
  >
    <el-image
      :preview-src-list="srcList"
      :src="src"
      style="width: 100px; height: 100px">
    </el-image>
    <my-button text="刷新照片" @click="listImg(myData)"/>
  </div>

</template>

<script>
import {copyObj} from "../../../../assets/js/utils";
import MyButton from "../../my/my-button";
import {request} from "../../../../assets/js/AxiosUtils";

export default {
  name: "order-img",
  components: {MyButton},
  data() {
    return {
      myData: {},
      src: undefined,
      srcList: [],
    }
  },
  methods: {
    listImg(uuid) {
      request({
        url: "/InstallationOrder/listImg",
        params: {uuid}
      }).then(res => {
        this.srcList = [];
        res.forEach(name => {
          this.srcList.push("/img/" + uuid + "/" + name);
        })
        this.src = this.srcList[0];
      })
    },
    copy(obj) {
      this.myData = obj ? copyObj(obj) : [];
    }
  },
  mounted() {
    this.copy(this.data)
    this.listImg(this.myData)
  },
  watch: {
    "data": {
      handler: function (e) {
        this.copy(e)
        this.listImg(this.myData)
      }
    }
  },
  props: ["data"],
}

</script>

<style scoped>

</style>
