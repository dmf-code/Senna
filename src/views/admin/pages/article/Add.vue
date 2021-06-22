<template>
  <el-dialog
    title="添加文章"
    v-model="dialogFormVisible"
    :append-to-body="true"
  >
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
          <el-checkbox v-for="tag in form.tags" :label="tag.id" :key="tag.id">{{
            tag.name
          }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="内容">
        <v-md-editor
          v-model="form.mdCode"
          @change="edit"
          height="400px"
        ></v-md-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  mounted() {},
  methods: {
    edit(value, render) {
      this.form.mdCode = value;
      this.form.htmlCode = render;
    },
    onSubmit() {
      this.$api.backend
        .article(
          {
            title: this.form.title,
            categoryIds: this.form.checkedCategorys.toString(),
            tagIds: this.form.checkedTags.toString(),
            mdCode: this.form.mdCode,
            htmlCode: this.form.htmlCode,
          },
          "POST"
        )
        .then((res) => {
          if (res.data.code == 0) {
            this.$message({ message: "添加成功", type: "success" });
            this.$router.replace("/refresh");
          } else {
            this.$message.error("添加失败");
          }
        });
    },
  },
  data: function () {
    return {
      dialogFormVisible: false,
      form: {
        title: "",
        checkedCategorys: [],
        categorys: "",
        checkedTags: [],
        tags: "",
        mdCode: "",
        htmlCode: "",
      },
    };
  },
};
</script>

<style>
</style>
