<template>
  <el-dialog title="分类" v-model="dialogFormVisible" :append-to-body="true">
    <el-form :model="form">
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="summit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      formLabelWidth: "120px",
      dialogFormVisible: false,
      index: null,
      form: {
        id: null,
        name: null,
      },
    };
  },
  methods: {
    summit() {
      this.$api.backend
        .category(
          {
            id: this.form.id,
            name: this.form.name,
          },
          "PUT"
        )
        .then((res) => {
          if (res.data.code == 0) {
            this.$message({ message: "修改成功", type: "success" });
            this.dialogFormVisible = false;
          } else {
            this.$message.error("修改失败");
          }
        });
    },
  },
};
</script>
