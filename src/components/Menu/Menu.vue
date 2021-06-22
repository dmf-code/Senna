<template>
  <el-menu
    :default-active="$route.path"
    :default-openeds="openMenus"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
    router
  >
    <SubMenu :menus="menus" parent="/admin"></SubMenu>
  </el-menu>
</template>

<script>
import SubMenu from "@/components/Menu/SubMenu.vue";
export default {
  created: function () {
    this.openMenus = this.$store.state.openMenus;
    console.log(this.openMenus);
  },
  mounted() {
    this.$api.backend.menuList().then((res) => {
      this.menus = res.data.data[0].children;
    });
  },
  data() {
    return {
      menus: [],
      openMenus: [],
    };
  },
  methods: {
    handleSelect() {
      return this.$store.state.menus;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
      this.$store.commit("menu", key);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
      this.$store.commit("menu", key);
    },
  },
  components: {
    SubMenu,
  },
};
</script>
