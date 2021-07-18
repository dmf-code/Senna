<template>
  <el-row>
    <el-col
      :span="4"
      v-for="(item, index) in this.list"
      :key="index"
      style="padding: 1em"
    >
      <el-card :body-style="{ padding: '0px' }">
        <a :href="item['url']" target="_blank">
          <el-image
            fit="fit"
            :src="`/api/common/download/image/origin/${item['image']}`"
            style="height: 256px"
          >
            <div class="image-slot">
              <el-image
                :lazy="true"
                fit="fit"
                :src="require('@/assets/image_not_find.jpg')"
                style="height: 256px"
              ></el-image>
            </div>
          </el-image>
          <div style="padding: 14px">
            <span>{{ item["name"] }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item["updatedAt"] }}</time>
            </div>
          </div>
        </a>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  created: function () {
    this.$api.frontend.bookmark().then((res) => {
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
};
</script>


<style>
/*包含以下五种的链接*/
a {
  text-decoration: none;
}
/*正常的未被访问过的链接*/
a:link {
  text-decoration: none;
}
/*已经访问过的链接*/
a:visited {
  text-decoration: none;
}
/*鼠标划过(停留)的链接*/
a:hover {
  text-decoration: none;
}
/* 正在点击的链接，鼠标在元素上按下还没有松开*/
a:active {
  text-decoration: none;
}
/* 获得焦点的时候 鼠标松开时显示的颜色*/
a:focus {
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