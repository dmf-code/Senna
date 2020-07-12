<template>
  <div>
    <div v-for="menu in menus" :key="menu.id">
      <el-menu-item
        :index="parent ? parent + '/' + menu.url : menu.url"
        :key="menu.url"
        v-if="!('children' in menu)"
      >
        <template slot="title">
          <i :class="menu.icon"></i>
          {{ menu.name }}
        </template>
      </el-menu-item>

      <el-submenu
        :index="parent ? parent + '/' + menu.url : menu.url"
        :key="menu.url"
        @click="opends"
        v-else
      >
        <template slot="title">
          <i :class="menu.icon"></i>
          {{menu.name}}
        </template>
        <SubMenu :menus="menu.children" :parent="parent ? parent + '/' + menu.url : menu.url"></SubMenu>
      </el-submenu>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubMenu",
  props: ["menus", "parent"],
  methods: {
    opends: function(index) {
      console.log(index);
      this.$store.commit("menu", index);
    }
  }
};
</script>