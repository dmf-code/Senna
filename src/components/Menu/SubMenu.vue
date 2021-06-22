<template>
  <div>
    <div v-for="menu in menus" :key="menu.id">
      <el-menu-item
        :index="parent ? parent + '/' + menu.url : menu.url"
        v-if="!('children' in menu)"
      >
        <template #title>
          <i :class="menu.icon"></i>
          {{ menu.name }}
        </template>
      </el-menu-item>

      <el-submenu :index="parent ? parent + '/' + menu.url : menu.url" v-else>
        <template #title>
          <i :class="menu.icon"></i>
          {{ menu.name }}
        </template>
        <SubMenu
          :menus="menu.children"
          :parent="parent ? parent + '/' + menu.url : menu.url"
        ></SubMenu>
      </el-submenu>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubMenu",
  props: ["menus", "parent"],
  methods: {},
};
</script>