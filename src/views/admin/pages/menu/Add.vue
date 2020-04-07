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
      <el-form-item label="父级菜单">
        <el-select v-model="form.parent_id" placeholder="请选择">
          <el-option v-for="item in menu" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option v-for="item in type" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作类型">
        <el-select v-model="form.operate_type" placeholder="请选择">
          <el-option v-for="item in operateType" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
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
  mounted() {
    this.axios.get("/api/backend/menu").then(res => {
      this.menu.push({ id: 0, name: "root" });
      if (res.data.status == true) {
        this.menu = this.menu.concat(res.data.data);
      }
    });
  },
  data() {
    return {
      dialogFormVisible: false,
      menu: [],
      type: [
        { id: 1, name: "菜单" },
        { id: 2, name: "子菜单" }
      ],
      operateType: [
        { id: "none", name: "无" },
        { id: "add", name: "添加" },
        { id: "update", name: "更新" },
        { id: "view", name: "查看" },
        { id: "del", name: "删除" }
      ],
      form: {
        status: 1,
        name: "",
        url: "",
        memo: "",
        parent_id: "",
        url: "",
        name: "",
        sequence: 1,
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
      this.form.status = Number(this.form.status);
      this.axios.post("/api/backend/menu", this.form).then(res => {
        if (res.data.status == true) {
          this.$message({ message: "添加成功", type: "success" });
          this.$router.replace("/refresh");
        } else {
          this.$message.error("添加失败");
        }
      });
    }
  }
};
</script>