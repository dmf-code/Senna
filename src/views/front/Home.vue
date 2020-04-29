<template>
  <el-container>
    <div style="padding: 0 20%;">
      <articleList :items="this.items"></articleList>
    </div>
  </el-container>
</template>

<script>
import articleList from "@/views/front/pages/article/List";
export default {
  created: function() {
    this.getArticleList();
  },
  data: function() {
    return {
      items: ""
    };
  },
  methods: {
    getArticleList() {
      this.axios.get("/api/front/article").then(res => {
        if (res.data.status == true) {
          this.items = res.data.data;
        } else {
          console.log("请求失败");
        }
      });
    }
  },
  components: {
    articleList
  }
};
</script>

<style>
</style>
