<template>
  <el-container>
    <div style="padding: 0 20%">
      <articleList></articleList>
    </div>
  </el-container>
</template>

<script>
import { view_import } from "@/utils/_import";
import articleList from "@/views/front/pages/article/List.vue";
export default {
  created: function () {},
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
