<template>
  <el-container>
    <articleList :items="this.items"></articleList>
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
      // items: [
      // {
      //   id: 1,
      //   title: "test1",
      //   image: {
      //     url:
      //       "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      //     fit: "fill"
      //   },
      //   content: "test1",
      //   create_time: "2020-01-01"
      // },
      // {
      //   id: 2,
      //   title: "test2",
      //   image: {
      //     url:
      //       "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      //     fit: "fill"
      //   },
      //   content: "test2",
      //   create_time: "2020-01-02"
      // }
      // ]
    };
  },
  methods: {
    getArticleList() {
      this.axios.get("/api/front/article").then(res => {
        console.log(res.data.status == true);
        if (res.data.status == true) {
          this.items = res.data.data;
          console.log(res.data.data);
          console.log("items: ", this.items);
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
