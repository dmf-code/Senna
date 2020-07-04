<template>
  <el-container>
    <div style="padding: 0 20%;">
      <articleList :items="this.items"></articleList>
    </div>
  </el-container>
</template>

<script>
import articleList from "@/views/front/pages/article/List";
import { getArticleList } from "@/apis/frontend/index.js";
export default {
  created: function() {
    getArticleList().then(res => {
      if (res.data.status == true) {
        this.items = res.data.data;
      }
    });
  },
  data: function() {
    return {
      items: ""
    };
  },
  methods: {},
  components: {
    articleList
  }
};
</script>

<style>
</style>
