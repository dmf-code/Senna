<template>
  <div class="home">
    <el-container direction="vertical">
      <dHeader></dHeader>
      <dMain></dMain>
      <dFooter></dFooter>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import dHeader from "../layouts/Header.vue";
import dMain from "../layouts/Main.vue";
import dFooter from "../layouts/Footer.vue";

export default {
  name: "front",
  components: {
    dHeader,
    dMain,
    dFooter,
  },
};
</script>

<style>
.main {
  min-height: calc(100vh - 121px);
}
</style>