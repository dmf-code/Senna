<template>
  <el-menu :default-active="$route.path" :default-openeds="openMenus" @open="open" @close="close">
    <SubMenu :menus="menus" parent="/" v-bind="$attrs" v-on="$listeners"></SubMenu>
  </el-menu>
</template>

<script>
import SubMenu from "@/components/Tutorial/Menu/SubMenu.vue";
export default {
  model: {
    prop: "menus",
    event: "change",
  },
  props: {
    menus: {
      default: [],
    },
  },
  mounted() {},
  created: function () {
    let newQuery = JSON.parse(JSON.stringify(this.$route.query));
    if ("idx" in newQuery) {
      this.openMenus = newQuery.idx.split(",");
    }
  },
  data() {
    return {
      openMenus: [],
    };
  },
  watch: {
    menus: function () {
      console.log(this.menus);
    },
  },
  methods: {
    open(index) {
      let newQuery = JSON.parse(JSON.stringify(this.$route.query));
      if ("idx" in newQuery) {
        this.openMenus = newQuery.idx.split(",");
      }
      this.openMenus.push(index);
      newQuery.idx = this.openMenus.join(",");
      this.$router.replace({ query: newQuery });
    },
    close(index) {
      let newQuery = JSON.parse(JSON.stringify(this.$route.query));
      if ("idx" in newQuery) {
        this.openMenus = newQuery.idx.split(",");
      }
      let idx = this.openMenus.indexOf(index);
      if (idx > -1) {
        this.openMenus.splice(idx, 1);
      }
      newQuery.idx = this.openMenus.join(",");
      if (newQuery.idx == "") {
        delete newQuery.idx;
      }
      this.$router.replace({ query: newQuery });
    },
  },
  components: {
    SubMenu,
  },
};
</script>
