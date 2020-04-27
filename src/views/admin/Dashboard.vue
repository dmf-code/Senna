<template>
  <div>
    <el-calendar v-model="value"></el-calendar>
    <Icon :value="icon"></Icon>
  </div>
</template>

<script>
import Icon from "@/components/Icon/Index";
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
      value: new Date(),
      icon: ""
    };
  },
  components: {
    Icon
  }
};
</script>

<style>
</style>
