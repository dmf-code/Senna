<template>
  <el-row>
    <el-col :span="4">
      <dMenu :menus="menus" v-on:info="changeInfo"></dMenu>
    </el-col>
    <el-col :span="20">
      <el-row>
        <h4 style="text-align: center;">{{ item.title }}</h4>
        <mavon-editor ref="md" v-html="item.htmlCode" :ishljs="true" style="padding: 5px 10px;"></mavon-editor>
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
  methods: {
    changeInfo(menu) {
      console.log(menu);
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