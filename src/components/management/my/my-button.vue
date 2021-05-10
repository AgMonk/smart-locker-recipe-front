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
  props: ["type", "text", "size"],
}

</script>

<style scoped>

</style>
