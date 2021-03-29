<template>
<div>
  <el-row>
    <el-col class="list-col" :key="item.id" v-for="item in this.items">
      <el-row type="flex">
        <el-col :span="24">
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
  <el-row style="text-align: center;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
  </el-row>
  </div>
</template>

<script>
export default {
  created: function() {

    this.page();

    this.$api.frontend.category().then(res => {
      res.data.data.forEach(element => {
        this.category[element["id"]] = element["name"];
      });
    });
  },
  data: function() {
    return {
      items: [],
      category: [],
      currentPage: 1,
      pageSize: 4,
      total: 0
    };
  },
  methods: {
    jump($item) {
      this.$router.push({
        path: "/article/" + $item.id
      });
    },
    page(page=1, pageSize=4) {
      this.$api.frontend.getArticleList({page: page, page_size: pageSize}).then((res) => {
        if (res.data.code == 0) {
            this.items = res.data.data.items;
            this.currentPage = res.data.data.page;
            this.pageSize = res.data.data.page_size;
            this.total = res.data.data.total;
          }
        });
    },
    handleSizeChange(val) {
        this.pageSize = val;
    },
    handleCurrentChange(val) {
        this.currentPage = val;
        this.page(this.currentPage, this.pageSize);
    },
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
