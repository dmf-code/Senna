<template>
  <el-row>
    <el-col class="list-col" :key="item.id" v-for="item in this.items">
      <el-row type="flex">
        <el-col :span="4">
          <el-image
            src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            fit="fill"
          ></el-image>
        </el-col>
        <el-col :span="20">
          <h3 style="margin-top: 0.25em;margin-bottom: 0.25em; text-align: center;">{{ item.title }}</h3>
          <div style="text-align: left;margin: 0.25em 1em;">
            <b>
              <i class="el-icon-folder"></i>
              {{ category[item.categoryIds] }}
            </b>
            <b>
              <i class="el-icon-date"></i>
              {{ item.createdAt }}
            </b>
          </div>
          <div style="text-align: left;margin: auto 1em;" v-html="item.summary"></div>
          <div style="float: right;vertical-align: bottom;">
            <el-button @click="jump(item)" plain>阅读更多</el-button>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  created: function() {
    this.$api.backend.category().then(res => {
      console.log(res);
      res.data.data.forEach(element => {
        this.category[element["id"]] = element["name"];
      });
    });
  },
  props: ["items"],
  data: function() {
    return {
      category: []
    };
  },
  methods: {
    jump($item) {
      this.$router.push({
        path: "/article/" + $item.id
      });
    }
  }
};
</script>


<style>
.list-col {
  /* border: 1px dashed black; */
  background-color: #ffffff;
  border-radius: 5px;
  margin: 1em auto;
  padding: 1em;
}
</style>
