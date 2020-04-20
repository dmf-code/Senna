<template>
  <div>
    <el-row>首页</el-row>
  </div>
</template>

<script>
export default {
  mounted() {
    this.axios.get("/api/backend/env").then(res => {
      console.log(res);
      this.env = res.data.data;
    });
  },
  data() {
    return {
      env: []
    };
  }
};
</script>

<style>
</style>
