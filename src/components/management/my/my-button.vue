<template>
  <el-button
    :type="type?type:'primary'"
    :size="size?size:autoSize()"
    @click="$emit('click')"
  >
    {{ text }}
  </el-button>
</template>

<script>
import {getClientWidth} from "../../../assets/js/utils";

export default {
  name: "my-button",
  data() {
    return {}
  },
  methods: {
    autoSize(){
      let w = getClientWidth();
      if (w < 1) {
        return "mini"
      }
      if (w < 2) {
        return "small"
      }
      return "medium"
    }
  },
  mounted() {
  },
  props: {
    type:{
      type:String,
    },
    size:{
      type:String,
    },
    text:{
      type:String,
      required:true
    },

  },
}

</script>

<style scoped>

</style>
