<template>
  <div>
    <el-calendar v-model="value"></el-calendar>
    <TreeTable></TreeTable>
  </div>
</template>

<script>
import TreeTable from "@/components/Table/TreeTable";
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
  components: {
    TreeTable
  }
};
</script>

<style>
</style>
