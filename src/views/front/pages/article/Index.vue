<template>
  <el-row>
    <h4 style="text-align: center;">{{ item.title }}</h4>
    <mavon-editor ref="md" v-html="item.htmlCode"></mavon-editor>
  </el-row>
</template>

<script>
export default {
  created: function() {
    this.getArticle();
  },
  data: function() {
    return {
      item: {}
    };
  },
  methods: {
    getArticle() {
      this.axios
        .get("/api/front/article/" + this.$route.params.id)
        .then(res => {
          if (res.data.status == true) {
            this.item = res.data.data;
            console.log(this.item);
          } else {
            console.log("获取文章信息失败");
          }
        });
    }
  }
};
</script>
