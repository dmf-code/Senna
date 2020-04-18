<template>
  <div>
    <div v-for="menu in menus" :key="menu.id">
      <el-submenu index="menu.url" v-if="menu.children">
        <template slot="title">
          <i :class="menu.icon"></i>
          {{menu.name}}
        </template>
        <!-- <el-menu-item-group>
          <el-menu-item
            v-for="item in menu.children"
            :key="item.id"
            index="item.url"
          >{{ item.name }}</el-menu-item>
        </el-menu-item-group>-->

        <SubMenu :menus="menu.children"></SubMenu>
      </el-submenu>
      <el-menu-item index="menu.url" v-else>
        <template slot="title">
          <i :class="menu.icon"></i>
          {{ menu.name }}
        </template>
      </el-menu-item>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubMenu",
  created() {
    // this.$axios.get("");
    // this.menus = [
    //   { id: 1, icon: "el-icon-folder", url: "/1", name: "1" },
    //   { id: 2, icon: "el-icon-folder", url: "/2", name: "2" },
    //   { id: 3, icon: "el-icon-folder", url: "/3", name: "3" },
    //   { id: 4, icon: "el-icon-folder", url: "/4", name: "4" },
    //   {
    //     id: 5,
    //     icon: "el-icon-folder",
    //     url: "/5",
    //     name: "5",
    //     children: [{ id: 6, icon: "el-icon-folder", url: "/6", name: "6" }]
    //   }
    // ];
  },
  props: ["menus"]
};
</script>