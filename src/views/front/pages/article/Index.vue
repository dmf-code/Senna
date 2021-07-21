<template>
  <el-row>
    <el-col>
      <div class="title">{{ item.title }}</div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12" :offset="6">
      <v-md-preview-html :html="item.htmlCode" ref="md"></v-md-preview-html>
    </el-col>
  </el-row>
</template>

<script>
export default {
  created: function () {
    this.$api.frontend.getArticle().then((res) => {
      if (res.data.code == 0) {
        this.item = res.data.data;
      }
    });
  },
  data: function () {
    return {
      item: {},
    };
  },
};
</script>

<style>
.title {
  text-align: center;
  background-color: white;
  padding: 2em 0;
  font-size: 1.5em;
}
</style>