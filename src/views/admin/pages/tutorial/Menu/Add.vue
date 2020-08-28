<template>
  <el-dialog title="菜单" :visible.sync="dialogFormVisible" :append-to-body="true">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="父级菜单">
        <el-cascader
          :options="menu"
          v-model="form.parent_id"
          :props="{ checkStrictly: true }"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option v-for="item in type" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" v-if="form.type == 2">
        <mavon-editor v-model="form.mdCode" :ishljs="true" @change="edit"></mavon-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>


<script>
import iconSelect from "@/components/Icon/Index";
export default {
  mounted() {},
  data() {
    return {
      dialogFormVisible: false,
      menu: [],
      type: [
        { id: 1, name: "目录" },
        { id: 2, name: "菜单" }
      ],
      operateType: [
        { id: "none", name: "无" },
        { id: "add", name: "添加" },
        { id: "update", name: "更新" },
        { id: "view", name: "查看" },
        { id: "del", name: "删除" }
      ],
      form: {
        htmlCode: "",
        mdCode: "",
        status: 1,
        title: "",
        url: "",
        memo: "",
        parent_id: 0,
        url: "",
        name: "",
        sequence: 5,
        type: "",
        component: "",
        icon: "",
        operate_type: ""
      }
    };
  },
  methods: {
    onSubmit() {
      let form = Object.assign({}, this.form);
      form.status = Number(form.status);
      form.parent_id = form.parent_id.pop();
      this.$api.backend.tutorial(form, "POST").then(res => {
        if (res.data.status == true) {
          this.$message({ message: "添加成功", type: "success" });
          this.dialogFormVisible = false;
          this.$emit("refresh");
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    init(row) {},
    edit(value, render) {
      this.form.mdCode = value;
      this.form.htmlCode = render;
    }
  },
  components: {
    iconSelect
  }
};
</script>