<template>
  <el-dialog title="编辑文章" :visible.sync="dialogFormVisible" :append-to-body="true">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.checkedCategorys" placeholder="请选择">
          <el-option
            v-for="category in categorys"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标签">
        <el-checkbox-group v-model="form.checkedTags">
          {{ tags }}
          <el-checkbox v-for="tag in tags" :label="tag.id" :key="tag.id">{{tag.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="内容">
        <mavon-editor v-model="form.mdCode" :ishljs="true" @change="edit"></mavon-editor>
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
  created() {},
  mounted() {
    this.getCategorys();
    this.getTags();
  },
  watch: {
    form(val, oldVal) {},
    categorys(val, oldVal) {},
    tags(val, oldVal) {}
  },
  data() {
    return {
      dialogFormVisible: false,
      categorys: [],
      tags: [],
      form: {
        title: "",
        checkedCategorys: [],
        checkedTags: [],
        mdCode: "",
        htmlCode: ""
      }
    };
  },
  methods: {
    edit(value, render) {
      this.form.mdCode = value;
      this.form.htmlCode = render;
    },
    onSubmit() {
      this.axios
        .put("/api/backend/article/" + this.form.id, {
          title: this.form.title,
          categoryIds: this.form.checkedCategorys.toString(),
          tagIds: this.form.checkedTags.toString(),
          mdCode: this.form.mdCode,
          htmlCode: this.form.htmlCode
        })
        .then(res => {
          if (res.data.status == true) {
            this.$message({ message: "添加成功", type: "success" });
            this.dialogFormVisible = true;
          } else {
            this.$message.error("添加失败");
          }
        });
    },
    getCategorys() {
      this.axios.get("/api/backend/category").then(res => {
        if (res.data.status == true) {
          this.categorys = res.data.data;
        } else {
          this.categorys = [];
        }
      });
    },
    getTags() {
      this.axios.get("/api/backend/tag").then(res => {
        if (res.data.status == true) {
          this.tags = res.data.data;
        } else {
          this.tags = [];
        }
      });
    }
  }
};
</script>
