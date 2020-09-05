<template>
  <el-menu :default-active="$route.path" :default-openeds="menusVuex" @open="open" @close="close">
    <SubMenu :menus="menus" parent="/" v-bind="$attrs" v-on="$listeners"></SubMenu>
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
  methods: {
    open(index) {
      let newQuery = JSON.parse(JSON.stringify(this.$route.query));
      console.log(newQuery);
      let _index = [];
      if ("tutirialIndex" in newQuery) {
        _index = newQuery.tutorialIndex.split(",");
      }
      _index.push(index);
      newQuery.tutorialIndex = _index.join(",");
      this.$router.replace({ query: newQuery });
    },
    close(index) {
      let newQuery = JSON.parse(JSON.stringify(this.$route.query));
      console.log(newQuery);
      let _index = [];
      if ("tutirialIndex" in newQuery) {
        _index = newQuery.tutorialIndex.split(",");
      }
      let idx = _index.indexOf(index);
      if (idx > -1) {
        _index.splice(idx, 1);
      }
      newQuery.tutorialIndex = _index.join(",");
      if (newQuery.tutorialIndex == "") {
        delete newQuery.tutorialIndex;
      }
      this.$router.replace({ query: newQuery });
    }
  },
  components: {
    SubMenu
  }
};
</script>
