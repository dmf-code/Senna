<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-active="$route.path" :default-openeds="['1','2']" router>
      <el-menu-item index="dashboard">首页</el-menu-item>
      <el-submenu index="1" @click="openeds(1)">
        <template slot="title">
          <i class="el-icon-message"></i>权限管理
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2" @click="openeds(2)">
        <template slot="title">
          <i class="el-icon-menu"></i>文章管理
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/article">列表</el-menu-item>
          <el-menu-item index="/admin/addArticle">添加</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3" @click="openeds(3)">
        <template slot="title">
          <i class="el-icon-menu"></i>文档管理
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/doc">列表</el-menu-item>
          <el-menu-item index="/admin/addDoc">添加</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4" @click="openeds(4)">
        <template slot="title">
          <i class="el-icon-menu"></i>分类管理
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/category">列表</el-menu-item>
          <el-menu-item index="/admin/addCategory">添加</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5" @click="openeds(5)">
        <template slot="title">
          <i class="el-icon-menu"></i>标签管理
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin/tag">列表</el-menu-item>
          <el-menu-item index="/admin/addTag">添加</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<style>
.el-aside {
  color: #333;
}
</style>

<script>
export default {
  computed: {},
  data() {
    return {
      openIndex: []
    };
  },
  methods: {
    openeds: function(index) {
      if ((idx = this.openIndex.indexOf(index)) == -1) {
        this.openIndex.push(index);
      } else {
        this.openIndex.splice(idx, 1);
      }
    }
  }
};
</script>