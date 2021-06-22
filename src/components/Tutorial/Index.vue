<template>
  <el-row style="overflow: hidden !important;">
    <el-col :span="4">
      <dMenu :menus="menus" v-on:info="changeInfo"></dMenu>
    </el-col>
    <el-col :span="20">
      <h4 style="text-align: center;">{{ item.title }}</h4>
      <mavon-editor
        ref="md"
        v-model="item.mdCode"
        style="padding: 5px 10px;"
        :subfield="false"
        :defaultOpen="'preview'"
        :toolbarsFlag="false"
        :editable="false"
        :scrollStyle="true"
        :ishljs="true"
      ></mavon-editor>
    </el-col>
  </el-row>
</template>

<script>
import dMenu from "@/components/Tutorial/Menu/Menu";

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
  created: function () {
    /**
     * 这里面遇到奇怪问题，无缘无故 body 加上 overflow: hidden
     * 最后导致加载页面直接无法滚动，解决方案直接将其置空
     * */
    document.body.style = "";
    let newQuery = JSON.parse(JSON.stringify(this.$route.query));
    if (newQuery.menu_id != null && newQuery.menu_id != undefined) {
      this.$api.frontend
        .tutorialContent({ id: newQuery.menu_id })
        .then((res) => {
          if (res.data.code == 0) {
            this.item = res.data.data;
          }
        });
    }
  },
  data: function () {
    return {
      item: {},
    };
  },
  // watch: {
  //   menus: function () {
  //     let items = this.menus;
  //     while (items.type == 1) {
  //       items = items.children;
  //     }
  //     this.item = items;
  //   },
  // },
  methods: {
    changeInfo(menu) {
      if (menu.type == 2) {
        let newQuery = JSON.parse(JSON.stringify(this.$route.query));
        newQuery.menu_id = menu.id;
        this.$router.replace({ query: newQuery });

        this.$api.frontend.tutorialContent({ id: menu.id }).then((res) => {
          if (res.data.code == 0) {
            this.item = res.data.data;
          }
        });
      }
    },
  },
  components: {
    dMenu,
  },
};
</script>

<style>
</style>