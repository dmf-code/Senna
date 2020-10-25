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
        <el-cascader :options="menu" v-model="parent_id" :props="{ checkStrictly: true }" clearable></el-cascader>
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
        <iconSelect :value="form.icon"></iconSelect>
      </el-form-item>
      <el-form-item label="URL">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="排序值">
        <el-input v-model="form.sequence"></el-input>
      </el-form-item>
      <el-form-item label="组件路径">
        <el-input v-model="form.component"></el-input>
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
import iconSelect from "@/components/Icon/Index";
export default {
  mounted() {
    this.$api.backend.menuList().then((res) => {
      if (res.data.code == 0) {
        this.menu = res.data.data;
      }
    });
  },
  data() {
    return {
      dialogFormVisible: false,
      menu: [],
      type: [
        { id: 1, name: "目录" },
        { id: 2, name: "菜单" },
      ],
      operateType: [
        { id: "none", name: "无" },
        { id: "add", name: "添加" },
        { id: "update", name: "更新" },
        { id: "view", name: "查看" },
        { id: "del", name: "删除" },
      ],
      parent_id: [],
      form: {
        status: 1,
        name: "",
        url: "",
        memo: "",
        parent_id: 0,
        url: "",
        name: "",
        sequence: 5,
        type: "",
        component: "",
        icon: "",
        operate_type: "",
      },
    };
  },
  methods: {
    onSubmit() {
      let form = this.form;
      form.status = Number(form.status);
      form.parent_id = parent_id[parent_id.length - 1];
      this.$api.backend.menu(form, "POST").then((res) => {
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
  components: {
    iconSelect,
  },
};
</script>