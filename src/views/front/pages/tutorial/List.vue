<template>
  <el-row>
    <el-col
      :span="4"
      v-for="(item, index) in this.list"
      :key="index"
      style="padding: 1em"
      @click.native="jump(item.id)"
    >
      <el-card :body-style="{ padding: '0px' }">
        <el-image
          fit="fit"
          :src="`/api/common/download/image/origin/${item['img']}`"
          style="height: 256px"
        >
          <div slot="error" class="image-slot">
            <el-image
              :lazy="true"
              fit="fit"
              :src="require('@/assets/image_not_find.jpg')"
              style="height: 256px"
            ></el-image>
          </div>
        </el-image>
        <div style="padding: 14px">
          <span>{{ item["title"] }}</span>
          <div class="bottom clearfix">
            <time class="time">{{ item["updatedAt"] }}</time>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  created: function () {
    this.$api.frontend.tutorial().then((res) => {
      if (res.data.code == 0) {
        this.list = res.data.data;
      }
    });
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    jump($id) {
      this.$router.push({ path: "/tutorialShow/" + $id });
    },
  },
  components: {},
};
</script>

<style>
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}

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