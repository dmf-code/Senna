<template>
  <el-dialog title="编辑" :visible.sync="dialogFormVisible" :append-to-body="true">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.memo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  created() {},
  mounted() {},
  watch: {},
  data() {
    return {
      dialogFormVisible: false,
      categorys: [],
      tags: [],
      form: {
        name: "",
        memo: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.axios
        .put("/api/backend/role/" + this.form.id, {
          name: this.form.name,
          memo: this.form.memo
        })
        .then(res => {
          if (res.data.status == true) {
            this.$message({ message: "添加成功", type: "success" });
            this.dialogFormVisible = true;
            this.$router.replace("/refresh");
          } else {
            this.$message.error("添加失败");
          }
        });
    }
  }
};
</script>
