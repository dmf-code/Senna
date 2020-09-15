<template>
  <el-dialog title="编辑" :visible.sync="dialogFormVisible" :append-to-body="true">
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
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  created() {},
  mounted: function () {
    this.$api.backend.menuApiList().then((res) => {
      if (res.data.status == true) {
        this.menu = res.data.data;
      }
    });
  },
  data() {
    return {
      menu: [],
      dialogFormVisible: false,
      form: {
        name: "",
        memo: "",
        menus: [],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$api.backend
        .role(
          {
            id: this.form.id,
            name: this.form.name,
            memo: this.form.memo,
            menus: this.form.menus.join(","),
          },
          "PUT"
        )
        .then((res) => {
          console.log("put: ", res);
          if (res.data.status == true) {
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
