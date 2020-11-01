<template>
  <el-row>
    <el-col :span="4">
      <dMenu :menus="menus" v-on:info="changeInfo"></dMenu>
    </el-col>
    <el-col :span="20">
      <el-row>
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
      </el-row>
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
  data: function () {
    return {
      item: {},
    };
  },
  watch: {
    menus: function () {
      let items = this.menus;
      while (items.type == 1) {
        items = items.children;
      }
      this.item = items;
    },
  },
  methods: {
    changeInfo(menu) {
      if (menu.type == 2) {
        this.$api.frontend.tutorialContent({ id: menu.id }).then((res) => {
          console.log("content", res);
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