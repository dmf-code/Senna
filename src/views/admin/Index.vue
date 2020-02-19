<template>
  <div class="home">
    <el-container direction="vertical">
      <dHeader></dHeader>
      <el-container>
        <dAside></dAside>
        <el-main id="main">
          <router-view></router-view>
        </el-main>
      </el-container>
      <dFooter></dFooter>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import dHeader from "@/views/admin/layouts/Header";
import dFooter from "@/views/admin/layouts/Footer";
import dAside from "@/views/admin/layouts/Sidebar";

export default {
  name: "Admin",
  components: {
    dHeader,
    dAside,
    dFooter
  }
};
</script>
