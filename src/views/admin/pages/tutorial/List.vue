<template>
  <div>
    <el-row>
      <el-button @click="handleAdd()">添加</el-button>
    </el-row>
    <el-row>
      <Add ref="add"></Add>
      <Update ref="update"></Update>
      <TMenu ref="menu"></TMenu>
      <el-col :span="4" v-for="(item, index) in this.list" :key="index" style="padding: 1em;">
        <el-card :body-style="{ padding: '0px' }">
          <el-image
            fit="fit"
            :src="`/api/front/static/img?url=${item['img']}`"
            style="height: 256px;"
          >
            <div slot="error" class="image-slot">
              <el-image
                :lazy="true"
                fit="fit"
                :src="require('@/assets/image_not_find.jpg')"
                style="height: 256px;"
              ></el-image>
            </div>
          </el-image>
          <div style="padding: 6px;">
            <span>{{item['title']}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item['updatedAt'] }}</time>
            </div>
          </div>
          <div style="float: right; margin-right: 10px;">
            <el-button type="text" @click="handleMenu(index, item)">菜单</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="handleEdit(index, item)">更新</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="handleDelete(index, item)">删除</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Add from "@/views/admin/pages/tutorial/Add";
import Update from "@/views/admin/pages/tutorial/Update";
import TMenu from "@/views/admin/pages/tutorial/Menu";
export default {
  created: function() {
    this.$api.backend.tutorial().then(res => {
      if (res.data.status == true) {
        this.list = res.data.data;
        console.log(this.list);
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
      this.$refs.img = row["img"];
      this.$refs.update.form = row;
    },
    handleDelete(index, row) {
      this.$api.backend.tutorial({ id: row["id"] }, "DELETE").then(res => {
        if (res.data.status == true) {
          this.$router.replace("/refresh");
        }
      });
    },
    handleMenu(index, row) {
      this.$refs.menu.dialogFormVisible = true;
      console.log(row);
    }
  },
  components: {
    Add,
    Update,
    TMenu
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