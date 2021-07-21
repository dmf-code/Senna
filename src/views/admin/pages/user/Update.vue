<template>
  <el-dialog title="编辑" v-model="dialogFormVisible" :append-to-body="true">
    <el-form :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-cascader
          :options="roles"
          v-model="form.roleIds"
          :props="props"
          clearable
        ></el-cascader>
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
  mounted() {
    this.$api.backend.role().then((res) => {
      if (res.data.code == 0) {
        res.data.data.forEach((element) => {
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
        roleIds: null,
      },
    };
  },
  methods: {
    onSubmit() {
      let newForm = this.form;
      newForm.roleIds = newForm.roleIds.join(",");

      this.$api.backend.admin(newForm, "PUT").then((res) => {
        if (res.data.code == 0) {
          this.$message({ message: "添加成功", type: "success" });
          this.dialogFormVisible = true;
          this.$router.replace("/refresh");
        } else {
          this.$message.error("添加失败");
        }
      });
    },
  },
};
</script>
