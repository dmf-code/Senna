<template>
  <el-container direction="vertical">
    <dHeader></dHeader>
    <div id="article">
      <mavon-editor v-html="this.value" />
    </div>
    <dFooter></dFooter>
  </el-container>
</template>

<script>
import dHeader from "@/views/front/layouts/Header";
import dFooter from "@/views/front/layouts/Footer";
export default {
  data: function() {
    return {
      value: "sdfsadf"
    };
  },
  components: {
    dHeader,
    dFooter
  }
};
</script>

<style>
</style>
