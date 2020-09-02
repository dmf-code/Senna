<template>
  <div>
    <Tutorial :menus="menus"></Tutorial>
  </div>
</template>

<script>
import Turorial from "@/components/Tutorial/Index";
export default {
  created() {
    this.$apis.frontend.TurorialList().then(res => {
      if (res.data.status == true) {
        this.menus = res.data.data;
      }
    });
  },
  data() {
    return {
      menus
    };
  },
  components: {
    Turorial
  }
};
</script>

<style>
</style>