<template>
  <div>
    <el-calendar v-model="value"></el-calendar>
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
      env: [],
      value: new Date()
    };
  },
  components: {}
};
</script>

<style>
</style>
