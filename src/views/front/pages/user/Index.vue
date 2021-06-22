<template>
  <div style="margin-top: 1em">
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <span>用户名称： xxxx</span>
        <span>注册时间： xxxxx</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
    };
  },
};
</script>