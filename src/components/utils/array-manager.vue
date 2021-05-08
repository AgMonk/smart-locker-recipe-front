<!--数组管理器-->
<template>
  <div>
    <div>
      <el-input v-model="item" size="small" @change="myData.push(item);item=undefined;$emit('change',myData)" placeholder="回车添加"/>
    </div>
    <div>
      <el-tag
        v-for="(tag,i) in myData"
        :key="tag"
        closable
        @close="myData.splice(i,1)"
      >
        {{tag}}
      </el-tag>
    </div>
  </div>
</template>

<script>
import {copyObj} from "../../assets/js/utils";

export default {
  name: "array-manager",
  data() {
    return {
      item: undefined,
      myData: [],
    }
  },
  methods: {
    copy(obj){
      this.myData = obj?copyObj(obj):[];
    }
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
