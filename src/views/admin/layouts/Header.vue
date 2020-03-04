<template>
  <el-header>
    <el-menu router :default-active="$route.path" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="/">梧桐树下</el-menu-item>
      <el-submenu index="/docs">
        <template slot="title">文档中心</template>
        <el-menu-item index="/docs/test">Test文档</el-menu-item>
      </el-submenu>

      <el-submenu style="float:right;">
        <template slot="title">admin</template>
        <el-menu-item index="/admin/dashboard">后台首页</el-menu-item>
        <el-menu-item @click="handleLogout">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  methods: {
    handleLogout() {
      this.$store.commit("logout");
      this.$router.push({ name: "login", path: "/login" });
    }
  }
};
</script>
