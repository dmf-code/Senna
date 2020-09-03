<template>
  <el-menu :default-active="$route.path" :default-openeds="menusVuex">
    <SubMenu :menus="menus" parent="/"></SubMenu>
  </el-menu>
</template>

<script>
import SubMenu from "@/components/Tutorial/Menu/SubMenu.vue";
export default {
  model: {
    prop: "menus",
    event: "change"
  },
  props: {
    menus: {
      default: []
    }
  },
  computed: {
    menusVuex() {}
  },
  mounted() {},
  data() {
    return {};
  },
  watch: {
    menus: function() {
      console.log(this.menus);
    }
  },
  methods: {},
  components: {
    SubMenu
  }
};
</script>
