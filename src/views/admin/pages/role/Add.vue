<template>
  <el-dialog
    title="添加角色"
    v-model="dialogFormVisible"
    :append-to-body="true"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.memo"></el-input>
      </el-form-item>
      <el-form-item label="权限菜单">
        <el-cascader
          :options="menu"
          v-model="form.menus"
          :props="{ multiple: true, emitPath: false }"
          clearable
        ></el-cascader>
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
  mounted: function () {
    this.$api.backend.menuList().then((res) => {
      if (res.data.code == 0) {
        this.menu = res.data.data;
      }
    });
  },
  methods: {
    onSubmit() {
      this.$api.backend
        .role(
          {
            name: this.form.name,
            memo: this.form.memo,
            menus: this.form.menus.join(","),
          },
          "POST"
        )
        .then((res) => {
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
  data: function () {
    return {
      dialogFormVisible: false,
      menu: [],
      form: {
        name: "",
        memo: "",
        menus: [],
      },
    };
  },
};
</script>

<style>
</style>
