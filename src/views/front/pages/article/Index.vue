<template>
  <el-row>
    <div class="title">{{ item.title }}</div>
    <mavon-editor
      ref="md"
      v-model="item.mdCode"
      :subfield="false"
      :defaultOpen="'preview'"
      :toolbarsFlag="false"
      :editable="false"
      :scrollStyle="true"
      :ishljs="true"
      style="padding: 5px 10em;"
    ></mavon-editor>
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

<style>
.title {
  text-align: center;
  background-color: white;
  padding: 2em 0;
  font-size: 1.5em;
}
</style>