<template>
  <el-header style="padding: 0 0">
    <el-menu
      router
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item v-for="item in nav" :key="item.id" :index="item.path">{{
        item.name
      }}</el-menu-item>
      <el-menu-item
        index="/login"
        style="float: right"
        v-if="this.userInfo == null"
      >
        <span>登录/注册</span>
      </el-menu-item>
      <el-submenu index style="float: right" v-else-if="this.userInfo != null">
        <template #title>{{ userInfo.user.username }}</template>
        <el-menu-item index="/user/center">用户中心</el-menu-item>
        <el-menu-item index="/admin/dashboard">后台首页</el-menu-item>
        <el-menu-item @click="handleLogout">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "c-header",
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
      this.$router.push({ path: "/login" });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
  },
};
</script>
