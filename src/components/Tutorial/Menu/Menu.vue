<template>
  <el-menu :default-active="$route.path" :default-openeds="menusVuex" router>
    <SubMenu :menus="menus" parent="/admin"></SubMenu>
  </el-menu>
</template>

<script>
import SubMenu from "@/components/Menu/SubMenu.vue";
export default {
  props: [menus],
  computed: {
    menusVuex() {}
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  components: {
    SubMenu
  }
};
</script>
