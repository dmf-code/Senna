<template>
  <el-menu :default-active="$route.path" :default-openeds="menusVuex" router>
    <SubMenu :menus="menus"></SubMenu>
  </el-menu>
</template>

<script>
import SubMenu from "@/components/Menu/SubMenu.vue";
export default {
  computed: {
    menusVuex() {
      return this.$store.state.menus;
    }
  },
  mounted() {
    this.axios.get("/api/backend/menuList").then(res => {
      this.menus = res.data.data[0].children;
    });
  },
  data() {
    return {
      menus: [
        { id: 1, icon: "el-icon-folder", url: "/1", name: "1" },
        { id: 2, icon: "el-icon-folder", url: "/2", name: "2" },
        { id: 3, icon: "el-icon-folder", url: "/3", name: "3" },
        { id: 4, icon: "el-icon-folder", url: "/4", name: "4" },
        {
          id: 5,
          icon: "el-icon-folder",
          url: "/5",
          name: "5",
          children: [
            { id: 6, icon: "el-icon-folder", url: "/6", name: "6" },
            { id: 7, icon: "el-icon-folder", url: "/7", name: "7" }
          ]
        }
      ]
    };
  },
  methods: {},
  components: {
    SubMenu
  }
};
</script>
