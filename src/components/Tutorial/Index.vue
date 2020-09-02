<template>
  <el-row>
    <el-col>
      <dMenu :menus="menus"></dMenu>1111111111111111
    </el-col>
    <el-col>
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
import dMenu from "./Menu/Menu";
export default {
  props: {
    menus: {
      type: Array
    }
  },
  watch: {
    menus: function() {
      console.log("cpm: ", this.menus);
    }
  },
  components: {
    dMenu
  }
};
</script>

<style>
</style>