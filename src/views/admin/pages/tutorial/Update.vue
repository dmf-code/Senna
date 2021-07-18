<template>
  <el-dialog
    title="更新教程"
    v-model="dialogFormVisible"
    :append-to-body="true"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="标签">
        <el-upload
          class="avatar-uploader"
          action="/api/common/upload/image"
          :headers="header"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="form.img"
            :src="`/api/common/download/image/origin/${form.img}`"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新</el-button>
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
      this.$api.backend.tutorial(this.form, "PUT").then((res) => {
        if (res.data.code == 0) {
          this.dialogFormVisible = false;
          this.$message({ message: "添加成功", type: "success" });
        } else {
          this.$message({ message: "更新失败", type: "error" });
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.form.img = res.filename;
      console.log(file);
      this.img = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG,PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }

      return (isJPG || isPNG) && isLt2M;
    },
  },
  data: function () {
    return {
      dialogFormVisible: false,
      img: "",
      header: {
        token: this.$storage.getItem("user_info").token,
      },
      form: {
        title: "",
        img: "",
        type: 1,
      },
    };
  },
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
