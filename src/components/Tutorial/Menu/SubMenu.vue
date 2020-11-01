<template>
  <div>
    <div v-for="menu in menus" :key="menu.id">
      <el-menu-item :index="menu.id + ''" v-if="!('children' in menu)" @click="showInfo(menu)">
        <template slot="title">
          <i v-if="menu.type == 2" class="el-icon-tickets"></i>
          <i v-else class="el-icon-folder"></i>
          {{ menu.name }}
        </template>
      </el-menu-item>

      <el-submenu :index="menu.id + ''" v-else>
        <template slot="title">
          <i class="el-icon-folder"></i>
          {{menu.name}}
        </template>
        <SubMenu :menus="menu.children" v-bind="$attrs" v-on="$listeners"></SubMenu>
      </el-submenu>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubMenu",
  props: ["menus"],
  methods: {
    showInfo(menu) {
      this.$emit("info", menu);
    },
  },
};
</script>