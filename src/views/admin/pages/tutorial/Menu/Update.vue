<template>
  <el-dialog title="菜单" v-model="dialogFormVisible" :append-to-body="true">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="父级菜单">
        <el-cascader
          :options="menu"
          v-model="parent_id"
          :props="{ checkStrictly: true }"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option
            v-for="item in type"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="内容" v-if="form.type == 2">
        <v-md-editor
          v-model="form.mdCode"
          :disabled-menus="[]"
          @change="edit"
          height="400px"
          @upload-image="handleUploadImage"
        ></v-md-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>


<script>
import iconSelect from "@/components/Icon/Index.vue";

export default {
  emits: ["refresh"],
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
      parent_id: 0,
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
        operate_type: "",
      },
    };
  },
  methods: {
    onSubmit() {
      let form = Object.assign({}, this.form);
      form.status = Number(form.status);
      form.title = form.name;

      form.parent_id = this.parent_id;

      this.$api.backend.tutorial(form, "PUT").then((res) => {
        if (res.data.code == 0) {
          this.$message({ message: "更新成功", type: "success" });
          this.dialogFormVisible = false;
          this.$emit("refresh");
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    init(row) {
      this.$api.backend.tutorialList({ pid: row["id"] }).then((res) => {
        if (res.data.code == 0) {
          this.menu = res.data.data;
        }
      });
    },
    edit(value, render) {
      this.form.mdCode = value;
      this.form.htmlCode = render;
    },
    handleUploadImage(event, insertImage, files) {
      let formdata = new FormData();
      formdata.append("file", files[0]);
      this.$api.backend
        .upload(formdata, "POST", {
          "Content-Type": "multipart/form-data",
        })
        .then((res) => {
          insertImage({
            url: "/api/common/download/image/origin/" + res.data.filename,
          });
        });
    },
  },
  components: {
    iconSelect,
  },
};
</script>