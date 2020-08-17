<template>
  <el-row>
    <el-col>
      <Menu></Menu>
    </el-col>
    <el-col>
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
import Menu from "./Menu/Menu";
export default {
  components: {
    Menu
  }
};
</script>

<style>
</style>