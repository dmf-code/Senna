<template>
  <div>
    <el-button @click="handleAdd()">添加</el-button>
    <Add ref="add"></Add>
    <Update ref="update"></Update>
    <el-divider></el-divider>
    <el-table :data="this.tableData" style="width: 100%">
      <el-table-column label="ID" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="排序" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sequence }}</span>
        </template>
      </el-table-column>

      <el-table-column label="url" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.url }}</span>
        </template>
      </el-table-column>

      <el-table-column label="组件路径" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.component }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Update from "@/views/admin/pages/url/Update";
import Add from "@/views/admin/pages/url/Add";
export default {
  mounted() {
    this.$api.backend.menuApiList().then((response) => {
      if (res.data.code == 0) {
        this.tableData = response.data.data;
      }
    });
  },
  computed: {},
  data() {
    return {
      tableData: null,
      table: [],
    };
  },
  methods: {
    handleAdd() {
      this.$refs.add.dialogFormVisible = true;
      this.$refs.form.status = 1;
    },
    handleEdit(index, row) {
      this.$refs.update.dialogFormVisible = true;
      this.$refs.update.form = row;
    },
    handleDelete(index, row) {
      this.$api.backend.menu({ id: row.id }, "DELETE").then((res) => {
        if (res.data.code == 0) {
          this.$router.replace("/refresh");
          this.$message({ message: "删除成功", type: "success" });
        } else {
          this.$message.error("删除失败");
        }
      });
    },
  },
  components: {
    Update,
    Add,
  },
};
</script>