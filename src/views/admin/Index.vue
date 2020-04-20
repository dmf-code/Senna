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
import dHeader from "@/views/admin/layouts/Header";
import dFooter from "@/views/admin/layouts/Footer";
import dMenu from "@/components/Menu/Menu.vue";

export default {
  name: "Admin",
  mounted() {
    this.axios.get("/api/backend/menuList").then(res => {
      console.log(res);
      this.menus = res.data.data[0].children;
    });
  },
  data() {
    return {
      menus: []
    };
  },
  components: {
    dHeader,
    dFooter,
    dMenu
  }
};
</script>
