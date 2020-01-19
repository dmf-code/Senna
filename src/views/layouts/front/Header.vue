<template>
        <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">梧桐树下</el-menu-item>
          <el-submenu index="2">
            <template slot="title">文档中心</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-menu-item style="float: right;">
            <span @click="login()">登录/注册</span>
          </el-menu-item>
        </el-menu>
        
      </el-header>
</template>

<script>
export default {
  data: function() {
    return {
      activeIndex: '1'
    };
  },
  methods: {
    handleSelect: function() {
      return 1;
    },
    login() {
      this.$router.push({path: '/login'});
    }
  }
}
</script>
