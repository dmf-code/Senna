<template>
  <el-dialog title="添加文章" :visible.sync="dialogFormVisible" :append-to-body="true">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="form.checkedCategorys" placeholder="请选择">
          <el-option
            v-for="category in form.categorys"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标签">
        <el-checkbox-group v-model="form.checkedTags">
          <el-checkbox v-for="tag in form.tags" :label="tag.id" :key="tag.id">{{tag.name}}</el-checkbox>
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
  mounted() {
    this.getCategorys();
    this.getTags();
  },
  methods: {
    edit(value, render) {
      this.form.mdCode = value;
      this.form.htmlCode = render;
    },
    onSubmit() {
      this.axios
        .post("/api/backend/article", {
          title: this.form.title,
          categoryIds: this.form.checkedCategorys.toString(),
          tagIds: this.form.checkedTags.toString(),
          mdCode: this.form.mdCode,
          htmlCode: this.form.htmlCode
        })
        .then(res => {
          if (res.data.status == true) {
            this.$message({ message: "添加成功", type: "success" });
          } else {
            this.$message.error("添加失败");
          }
        });
    },
    getCategorys() {
      this.axios.get("/api/backend/category").then(res => {
        if (res.data.status == true) {
          this.form.categorys = res.data.data;
        } else {
          this.form.categorys = [];
        }
      });
    },
    getTags() {
      this.axios.get("/api/backend/tag").then(res => {
        if (res.data.status == true) {
          this.form.tags = res.data.data;
        } else {
          this.form.tags = [];
        }
      });
    }
  },
  data: function() {
    return {
      dialogFormVisible: false,
      form: {
        title: "",
        checkedCategorys: [],
        categorys: "",
        checkedTags: [],
        tags: "",
        mdCode: "",
        htmlCode: ""
      }
    };
  }
};
</script>

<style>
</style>
