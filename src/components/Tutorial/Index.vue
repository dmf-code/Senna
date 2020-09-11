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
    event: "change"
  },
  props: {
    menus: {
      default: []
    }
  },
  data: function() {
    return {
      item: {}
    };
  },
  watch: {
    menus: function() {
      let items = this.menus;
      while (items[0].type == 1) {
        items = items[0].children;
      }
      this.item = items[0];
    }
  },
  methods: {
    changeInfo(menu) {
      this.item = menu;
    }
  },
  components: {
    dMenu
  }
};
</script>

<style>
</style>