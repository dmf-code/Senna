<template>
  <el-header style="padding: 0 0">
    <el-menu
      router
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item v-for="item in nav" :key="item.id" :index="item.path">{{
        item.name
      }}</el-menu-item>
      <el-menu-item
        index="/login"
        style="float: right"
        v-if="this.user_info == null"
      >
        <span>登录/注册</span>
      </el-menu-item>
      <el-submenu index style="float: right" v-else-if="this.user_info != null">
        <template slot="title">{{ user_info.user.username }}</template>
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
  mounted() {
    this.$api.frontend.nav({ is_hide: 1 }).then((res) => {
      this.nav = res.data.data;
    });
  },
  data: function () {
    return {
      nav: [],
    };
  },
  methods: {
    handleLogout() {
      this.$store.commit("logout");
      this.$router.push({ name: "login", path: "/login" });
    },
  },
  computed: {
    ...mapState({
      user_info: (state) => state.user_info,
    }),
  },
};
</script>
