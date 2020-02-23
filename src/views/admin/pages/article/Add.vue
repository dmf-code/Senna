<template>
  <div>
    <mavon-editor v-model="value" :ishljs="true" @change="edit"></mavon-editor>
  </div>
</template>

<script>
export default {
  methods: {
    edit(value, render) {
      console.log(value);
      console.log(render);
    }
  },
  data: function() {
    return {
      value: ""
    };
  }
};
</script>

<style>
</style>
