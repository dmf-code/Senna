<template>
  <el-dialog title="菜单" :visible.sync="dialogFormVisible" :append-to-body="true">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          active-value="1"
          inactive-value="2"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item label="操作类型">
        <el-input v-model="form.operate_type"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item label="URL">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="排序值">
        <el-input v-model="form.sequence"></el-input>
      </el-form-item>
      <el-form-item label="Code">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="form.memo"></el-input>
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
        status: 1,
        name: "",
        url: "",
        memo: "",
        parent_id: "",
        url: "",
        name: "",
        sequence: "",
        type: "",
        code: "",
        icon: "",
        operate_type: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.dialogFormVisible = false;
      this.axios.post("/api/backend/menu", this.form).then(res => {
        if (res.data.status == true) {
          this.$parent.getTbaleData();
          this.$message({ message: "添加成功", type: "success" });
        } else {
          this.$message.error("添加失败");
        }
      });
    }
  }
};
</script>