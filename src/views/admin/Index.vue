<template>
  <div class="home">
    <el-container direction="vertical">
      <dHeader></dHeader>
      <el-container>
        <el-aside>
          <dMenu></dMenu>
        </el-aside>
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
import dHeader from "../layouts/Header.vue";
import dFooter from "../layouts/Footer.vue";
import dMenu from "@/components/Menu/Menu.vue";

export default {
  name: "Admin",
  created: function () {},
  data() {
    return {};
  },
  components: {
    dHeader,
    dFooter,
    dMenu,
  },
};
</script>
