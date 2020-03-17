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
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="引用次数" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.num }}</span>
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
import Update from "@/views/admin/pages/tag/Update";
import Add from "@/views/admin/pages/tag/Add";
export default {
  mounted() {
    this.getTbaleData();
  },
  computed: {},
  data() {
    return {
      tableData: null
    };
  },
  methods: {
    getTbaleData() {
      this.axios.get("/api/backend/tag").then(response => {
        if (response.data.status == true) {
          this.tableData = response.data.data;
        }
      });
    },
    handleAdd() {
      this.$refs.add.dialogFormVisible = true;
    },
    handleEdit(index, row) {
      this.$refs.update.dialogFormVisible = true;
      this.$refs.update.form = row;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.axios.delete("/api/backend/tag/" + row.id).then(res => {
        if (res.data.status == true) {
          this.getTbaleData();
          this.$message({ message: "删除成功", type: "success" });
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