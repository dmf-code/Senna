<template>
  <el-dialog title="tag创建" v-model="dialogFormVisible" :append-to-body="true">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
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
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.dialogFormVisible = false;
      this.$api.backend
        .tag(
          {
            name: this.form.name,
          },
          "POST"
        )
        .then((res) => {
          if (res.data.code == 0) {
            this.$message({ message: "添加成功", type: "success" });
            this.$router.replace("/refresh");
          } else {
            this.$message.error("添加失败");
          }
        });
    },
  },
};
</script>