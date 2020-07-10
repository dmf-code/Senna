<template>
  <el-header style="padding:0 0;">
    <el-menu router :default-active="$route.path" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="/">梧桐树下</el-menu-item>
      <el-submenu index="/tutorial">
        <template slot="title">文档中心</template>
        <el-menu-item index="/tutorial">Test文档</el-menu-item>
      </el-submenu>

      <el-menu-item index="/login" style="float: right;" v-if="this.is_login == false">
        <span>登录/注册</span>
      </el-menu-item>
      <el-submenu index style="float:right;" v-else-if="this.is_login">
        <template slot="title">{{ user_info.data.user.username }}</template>
        <el-menu-item index="/front/user/center">用户中心</el-menu-item>
        <el-menu-item index="/admin/dashboard">后台首页</el-menu-item>
        <el-menu-item @click="handleLogout">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-header>
</template>

<script>
import { mapState, mapMutations, mapAction } from "vuex";

export default {
  mounted() {},
  data: function() {
    return {};
  },
  methods: {
    handleLogout() {
      this.$store.commit("logout");
      this.$router.push({ name: "login", path: "/login" });
    }
  },
  computed: {
    ...mapState({
      is_login: state => state.is_login,
      user_info: state => state.user_info
    })
  }
};
</script>
