<template>
  <div>
    <mavon-editor v-model="value" :ishljs="true"></mavon-editor>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      value: ""
    };
  }
};
</script>

<style>
</style>
