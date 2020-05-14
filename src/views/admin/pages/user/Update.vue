<template>
  <el-dialog title="编辑" :visible.sync="dialogFormVisible" :append-to-body="true">
    <el-form :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-cascader :options="roles" v-model="form.role_ids" :props="props" clearable></el-cascader>
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
  mounted() {
    this.axios.get("/api/backend/role").then(res => {
      if (res.data.status == true) {
        console.log(res.data.data);
        res.data.data.forEach(element => {
          this.roles.push({ value: element.id, label: element.name });
        });
      }
    });
  },
  watch: {},
  data() {
    return {
      props: { multiple: true },
      dialogFormVisible: false,
      roles: [],
      form: {
        username: null,
        role_ids: null
      }
    };
  },
  methods: {
    onSubmit() {
      let newForm = this.form;
      newForm.role_ids = newForm.role_ids.join(",");
      this.axios
        .put("/api/backend/admin/" + this.form.id, newForm)
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
