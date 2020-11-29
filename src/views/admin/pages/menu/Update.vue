<template>
  <el-dialog
    title="分类"
    :visible.sync="dialogFormVisible"
    :append-to-body="true"
  >
    <el-form :model="form">
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-switch
          v-model="form.status"
          :active-value="active"
          :inactive-value="inactive"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </el-form-item>

      <el-form-item label="父级菜单" :label-width="formLabelWidth">
        <el-cascader
          :options="menu"
          v-model="parent_id"
          :props="{ checkStrictly: true }"
          clearable
        ></el-cascader>
      </el-form-item>

      <el-form-item label="类型" :label-width="formLabelWidth">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option
            v-for="item in type"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="操作类型" :label-width="formLabelWidth">
        <el-select v-model="form.operate_type" placeholder="请选择">
          <el-option
            v-for="item in operateType"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="图标" :label-width="formLabelWidth">
        <iconSelect v-model="form.icon" disabled="true"></iconSelect>
      </el-form-item>

      <el-form-item label="URL" :label-width="formLabelWidth">
        <el-input v-model="form.url" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="排序值" :label-width="formLabelWidth">
        <el-input v-model="form.sequence"></el-input>
      </el-form-item>

      <el-form-item label="组件路径" :label-width="formLabelWidth">
        <el-input v-model="form.component" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.memo"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="summit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import iconSelect from "@/components/Icon/Index";
export default {
  mounted() {},
  watch: {
    form: function () {},
  },
  data() {
    return {
      active: 1,
      inactive: 2,
      formLabelWidth: "120px",
      dialogFormVisible: false,
      index: null,
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
        id: null,
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
    summit() {
      let newForm = {
        id: this.form.id,
        status: this.form.status,
        name: this.form.name,
        url: this.form.url,
        memo: this.form.memo,
        parent_id: this.parent_id[this.parent_id.length - 1],
        sequence: this.form.sequence,
        type: this.form.type,
        component: this.form.component,
        icon: this.form.icon,
        operate_type: this.form.operate_type,
      };
      this.$api.backend.menu(newForm, "PUT").then((res) => {
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
  components: {
    iconSelect,
  },
};
</script>
