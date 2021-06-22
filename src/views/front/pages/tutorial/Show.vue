<template>
  <div>
    <Tutorial :menus="menus"></Tutorial>
  </div>
</template>

<script>
import Tutorial from "@/components/Tutorial/Index";
export default {
  created() {
    console.log("query", this.$route.params.pid);
    this.$api.frontend.tutorialList({ is_front: true }).then((res) => {
      if (res.data.code == 0) {
        this.menus = res.data.data;
        console.log("Show", this.menus);
      }
    });
  },
  data() {
    return {
      menus: null,
    };
  },
  components: {
    Tutorial,
  },
};
</script>

<style>
</style>