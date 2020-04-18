<template>
  <div>
    <el-button @click="handleAdd()">添加</el-button>
    <Add ref="add"></Add>
    <el-divider></el-divider>
    <el-table :data="this.tableData" style="width: 100%">
      <el-table-column label="ID" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="父级ID" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.parent_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.status }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="URL" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.url }}</span>
        </template>
      </el-table-column>

      <el-table-column label="类型" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.type }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作类型" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.operate_type }}</span>
        </template>
      </el-table-column>

      <el-table-column label="排序值" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.sequence }}</span>
        </template>
      </el-table-column>

      <el-table-column label="组件路径" width="90">
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
      <Update ref="update"></Update>
    </el-table>
  </div>
</template>

<script>
import Update from "@/views/admin/pages/menu/Update";
import Add from "@/views/admin/pages/menu/Add";
export default {
  mounted() {
    this.axios.get("/api/backend/menu").then(response => {
      if (response.data.status == true) {
        this.tableData = response.data.data;
      }
    });
  },
  computed: {},
  data() {
    return {
      tableData: null
    };
  },
  methods: {
    handleAdd() {
      this.$refs.add.dialogFormVisible = true;
    },
    handleEdit(index, row) {
      this.$refs.update.dialogFormVisible = true;
      this.$refs.update.form = row;
    },
    handleDelete(index, row) {
      this.axios.delete("/api/backend/menu/" + row.id).then(res => {
        if (res.data.status == true) {
          this.$router.replace("/refresh");
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