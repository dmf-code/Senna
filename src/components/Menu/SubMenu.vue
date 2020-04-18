<template>
  <div>
    <div v-for="menu in menus" :key="menu.id">
      <el-menu-item :index="menu.url" v-if="menu.children && menu.children.length == 0">
        <template slot="title">
          <i :class="menu.icon"></i>
          {{ menu.name }}
        </template>
      </el-menu-item>
      <el-submenu :index="menu.name + menu.id" @click="opends" v-else>
        <template slot="title">
          <i :class="menu.icon"></i>
          {{menu.name}}
        </template>
        <SubMenu :menus="menu.children"></SubMenu>
      </el-submenu>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubMenu",
  props: ["menus"],
  methods: {
    opends: function(index) {
      console.log(index);
      this.$store.commit("menu", index);
    }
  }
};
</script>