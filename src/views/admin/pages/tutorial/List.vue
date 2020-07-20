<template>
  <div>
    <el-row>
      <el-button @click="handleAdd()">添加</el-button>
    </el-row>
    <el-row>
      <Add ref="add"></Add>
      <Update ref="update"></Update>
      <el-col :span="4" v-for="(index, item) in this.list" :key="index" style="padding: 1em;">
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" @click="handleEdit(index, item)" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Add from "@/views/admin/pages/tutorial/Add";
import Update from "@/views/admin/pages/tutorial/Update";
import { tutorial } from "@/apis/backend/index";
export default {
  created: function() {
    tutorial().then(res => {
      if (res.status == true) {
        this.list = res.data.data;
        console.log(res);
        console.log("data", this.list);
      }
    });
  },
  data() {
    return {
      list: [],
      currentDate: new Date()
    };
  },
  methods: {
    handleAdd() {
      this.$refs.add.dialogFormVisible = true;
    },
    handleEdit(index, row) {
      this.$refs.update.dialogFormVisible = true;
      this.$refs.update.form = row;
    }
  },
  components: {
    Add,
    Update
  }
};
</script>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>