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
import dHeader from "@/views/layouts/Header";
import dMain from "@/views/layouts/Main";
import dFooter from "@/views/layouts/Footer";

export default {
  name: "front",
  components: {
    dHeader,
    dMain,
    dFooter
  }
};
</script>

<style>
.main {
  min-height: calc(100vh - 121px);
}
</style>