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
      <el-table-column label="用户" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.admin_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="角色" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.role_name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.created_at }}</span>
        </template>
      </el-table-column>

      <el-table-column label="更新时间" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.updated_at != "0001-01-01 00:00:00"
              ? scope.row.updated_at
              : "未更新"
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <Update ref="update"></Update>
    </el-table>
  </div>
</template>

<script>
import Update from "@/views/admin/pages/adminRole/Update";
import Add from "@/views/admin/pages/adminRole/Add";
export default {
  created() {
    this.$api.backend.adminRole().then((res) => {
      if (res.data.code == 0) {
        this.tableData = res.data.data;
      }
    });
  },
  computed: {},
  data() {
    return {
      tableData: null,
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
      this.$api.backend.adminRole({ id: row.id }, "DELETE").then((res) => {
        if (res.data.code == 0) {
          this.$message({ message: "删除成功", type: "success" });
          this.$router.replace("/refresh");
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