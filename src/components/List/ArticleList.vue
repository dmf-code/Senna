<template>
  <el-row>
    <el-col class="list-col" :key="item.id" v-for="item in this.items">
      <el-row>
        <el-col :span="4">
          <el-image
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="fit"
          ></el-image>
        </el-col>
        <el-col :span="20">
          <h3 style="margin-top: 0.25em;margin-bottom: 0.25em;">{{ item.title }}</h3>
          <div style="text-align: left;margin: 0.25em 1em;">
            <i class="el-icon-folder"></i>
            {{ item.checked_categorys }}
            <i class="el-icon-date"></i>
            {{ item.createdAt }}
          </div>
          <div style="text-align: left;margin: auto 1em;">{{ item.htmlCode }}</div>
          <div style="float: right;">
            <el-button @click="jump(item.id)" plain>阅读更多</el-button>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ["items"],
  data: function() {
    return {};
  },
  methods: {
    jump($id) {
      this.$router.push({ path: "/article/" + $id });
    }
  }
};
</script>


<style>
.list-col {
  border: 1px dashed black;
  border-radius: 5px;
  margin: 1em auto;
  padding: 1em;
}
</style>
