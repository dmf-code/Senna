<template>
        <el-header>
        <el-menu router :default-active="$route.path" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="/">梧桐树下</el-menu-item>
          <el-submenu index="/docs">
            <template slot="title">文档中心</template>
            <el-menu-item index="/docs/test">Test文档</el-menu-item>
          </el-submenu>

          <el-menu-item index="/login" style="float: right;">
            <span>登录/注册</span>
          </el-menu-item>
        </el-menu>
        
      </el-header>
</template>

<script>
export default {
  data: function() {
    return {
    };
  },
  methods: {
  }
}
</script>
