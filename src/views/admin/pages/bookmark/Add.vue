<template>
  <el-dialog title="菜单" v-model="dialogFormVisible" :append-to-body="true">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="状态">
        <el-switch
          v-model="form.is_hide"
          :active-value="notHide"
          :inactive-value="hide"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </el-form-item>

      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="Url">
        <el-input v-model="form.url"></el-input>
      </el-form-item>

      <el-form-item label="封面图片">
        <el-upload
          class="avatar-uploader"
          action="/api/common/upload/image"
          :show-file-list="false"
          :headers="header"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="image" :src="image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>


<script>
export default {
  mounted() {},
  data() {
    return {
      dialogFormVisible: false,
      nav: [],
      hide: 2,
      notHide: 1,
      image: "",
      header: {
        token: this.$storage.getItem("user_info").token,
      },
      form: {
        is_hide: 1,
        path: "",
        name: "",
        image: "",
      },
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.image = res.filename;
      this.image = URL.createObjectURL(file.raw);
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
    onSubmit() {
      let form = this.form;

      this.$api.backend.bookmark(form, "POST").then((res) => {
        if (res.data.code == 0) {
          this.$message({ message: "添加成功", type: "success" });
          this.dialogFormVisible = false;
          this.$router.replace("/refresh");
        } else {
          this.$message.error("添加失败");
        }
      });
    },
  },
};
</script>