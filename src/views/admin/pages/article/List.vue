<template>
  <div>
    <el-button @click="handleAdd()">添加</el-button>
    <Add ref="add"></Add>
    <el-divider></el-divider>
    <el-table :data="this.tableData" style="width: 100%">
      <el-table-column label="ID" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.createdAt }}</span>
        </template>
      </el-table-column>

      <el-table-column label="更新时间" width="180">
        <template slot-scope="scope">
          <span
            style="margin-left: 10px"
          >{{ scope.row.updatedAt != "0001-01-01 00:00:00" ? scope.row.updatedAt : "未更新" }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <Update ref="update"></Update>
    </el-table>
  </div>
</template>

<script>
import Update from "@/views/admin/pages/article/Update";
import Add from "@/views/admin/pages/article/Add";

export default {
  mounted() {
    this.$api.backend.article().then(response => {
      if (response.data.status == true) {
        this.tableData = response.data.data;
      }
    });

    this.$api.backend.category().then(res => {
      if (res.data.status == true) {
        this.categorys = res.data.data;
      } else {
        this.categorys = [];
      }
    });
    this.$api.backend.tag().then(res => {
      if (res.data.status == true) {
        this.tags = res.data.data;
      } else {
        this.tags = [];
      }
    });
  },
  computed: {},
  data() {
    return {
      tableData: null,
      categorys: [],
      tags: []
    };
  },
  methods: {
    handleAdd() {
      this.$refs.add.dialogFormVisible = true;
      this.$refs.add.form.categorys = this.categorys;
      this.$refs.add.form.tags = this.tags;
    },
    handleEdit(index, row) {
      this.$refs.update.dialogFormVisible = true;
      row.checkedCategorys = Number(row.categoryIds);
      console.log("category", row.checkedCategorys);
      row.checkedTags = row.tagIds.split(",");
      this.$refs.update.categorys = this.categorys;
      this.$refs.update.tags = this.tags;
      this.$refs.update.form = row;
    },
    handleDelete(index, row) {
      this.$api.backend.article({ id: row.id }, "DELETE").then(res => {
        if (res.data.status == true) {
          this.$message({ message: "删除成功", type: "success" });
          this.$router.replace("/refresh");
        } else {
          this.$message.error("删除失败");
        }
      });
    }
  },
  components: {
    Update,
    Add
  }
};
</script>