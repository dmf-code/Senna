<template>
  <el-container>
    <div style="padding: 0 20%;">
      <articleList></articleList>
    </div>
  </el-container>
</template>

<script>
import articleList from "@/views/front/pages/article/List";
export default {
  created: function () {

  },
  data: function () {
    return {
      items: "",
    };
  },
  methods: {},
  components: {
    articleList,
  },
};
</script>

<style>
</style>
