<template>
  <el-dialog
    title="菜单"
    :visible.sync="dialogFormVisible"
    :append-to-body="true"
  >
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

      <el-form-item label="Path">
        <el-input v-model="form.path"></el-input>
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
      hide: 1,
      notHide: 2,
      form: {
        is_hide: 2,
        path: "",
        name: "",
      },
    };
  },
  methods: {
    onSubmit() {
      let form = this.form;

      this.$api.backend.nav(form, "POST").then((res) => {
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