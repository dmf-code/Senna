<template>
  <el-dialog title="添加教程" :visible.sync="dialogFormVisible" :append-to-body="true">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="标签">
        <el-upload
          class="avatar-uploader"
          action="/api/common/upload/image"
          :show-file-list="false"
          :headers="header"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="img" :src="img" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  mounted() {},
  methods: {
    onSubmit() {
      this.$api.backend.tutorial(this.form, "POST").then(res => {
        if (res.data.status == true) {
          this.dialogFormVisible = false;
          this.$message({ message: "添加成功", type: "success" });
          this.$router.replace("/refresh");
        }
      });
    },
    handleAvatarSuccess(res, file) {
      if (res.status == true) {
        this.form.img = res.data.path;
        this.img = URL.createObjectURL(file.raw);
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  data: function() {
    return {
      dialogFormVisible: false,
      img: "",
      header: {
        token: this.$storage.getItem("user_info").token
      },
      form: {
        title: "",
        img: ""
      }
    };
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
