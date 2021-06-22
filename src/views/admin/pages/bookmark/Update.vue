<template>
  <el-dialog
    title="分类"
    :visible.sync="dialogFormVisible"
    :append-to-body="true"
  >
    <el-form :model="form">
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
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="summit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  mounted() {},
  data() {
    return {
      active: 1,
      inactive: 2,
      formLabelWidth: "120px",
      dialogFormVisible: false,
      index: null,
      nav: [],
      hide: 2,
      notHide: 1,
      form: {
        is_hide: 2,
        path: "",
        name: "",
      },
    };
  },
  methods: {
    summit() {
      let newForm = {
        id: this.form.id,
        is_hide: this.form.is_hide,
        name: this.form.name,
        path: this.form.path,
      };

      this.$api.backend.bookmark(newForm, "PUT").then((res) => {
        if (res.data.code == 0) {
          this.$message({ message: "修改成功", type: "success" });
          this.dialogFormVisible = false;
          this.$router.replace("/refresh");
        } else {
          this.$message.error("修改失败");
        }
      });
    },
  },
};
</script>
