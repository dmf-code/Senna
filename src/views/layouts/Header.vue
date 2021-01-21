<template>
  <el-header style="padding:0 0;">
    <el-menu router :default-active="$route.path" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="/">梧桐树下</el-menu-item>
      <el-menu-item index="/tutorial">文档中心</el-menu-item>
      <el-menu-item index="/login" style="float: right;" v-if="this.user_info == null">
        <span>登录/注册</span>
      </el-menu-item>
      <el-submenu index style="float:right;" v-else-if="this.user_info != null">
        <template slot="title" v-if="user_info.user">{{ user_info.user.username }}</template>
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
      user_info: state => state.user_info
    })
  }
};
</script>
