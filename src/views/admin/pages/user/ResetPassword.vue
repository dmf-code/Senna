<template>
  <el-dialog title="重置密码" :visible.sync="dialogFormVisible" :append-to-body="true">
    <el-form :model="form" label-width="80px">
      <el-form-item label="密码">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="form.password2" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">重置</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  watch: {},
  data() {
    return {
      dialogFormVisible: false,
      row: null,
      form: {
        password: null,
        password2: null,
      },
    };
  },
  methods: {
    onSubmit() {
      if (this.form.password == null || this.form.password2 == "") {
        this.$message({ message: "密码不能设置为空", type: "alert" });
        return;
      }
      if (this.form.password != this.form.password2) {
        this.$message({ message: "密码不一致", type: "alert" });
        return;
      }

      this.$api.backend
        .resetPassword({
          id: this.row.id,
          password: this.form.password,
          password2: this.form.password2,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.$message({ message: "修改密码成功", type: "success" });
            this.dialogFormVisible = false;
          } else {
            this.$message.error("修改密码失败");
          }
        });
    },
  },
};
</script>
