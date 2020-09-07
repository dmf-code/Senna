<template>
  <el-row>
    <h4 style="text-align: center;">{{ item.title }}</h4>

    <mavon-editor ref="md" v-html="item.htmlCode" :ishljs="true" style="padding: 5px 10em;"></mavon-editor>
  </el-row>
</template>

<script>
export default {
  created: function() {
    this.$api.frontend.getArticle().then(res => {
      if (res.data.status == true) {
        this.item = res.data.data;
      }
    });
  },
  data: function() {
    return {
      item: {}
    };
  }
};
</script>
