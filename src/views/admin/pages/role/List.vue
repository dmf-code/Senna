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

      <el-table-column label="备注" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.memo }}</span>
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
    </el-table>
  </div>
</template>

<script>
import Update from "@/views/admin/pages/role/Update";
import Add from "@/views/admin/pages/role/Add";
import { role, roleMenuList } from "@/apis/backend/index";
export default {
  mounted() {
    this.axios.get("/api/backend/role").then(response => {
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
      roleMenuList(
        "/api/backend/roleMenuList?roleId=" + row.id,
        {},
        "GET"
      ).then(res => {
        this.$refs.update.form = row;
        this.$refs.update.form.menus = [];
        this.$refs.update.dialogFormVisible = true;
        res.data.data.forEach(element => {
          this.$refs.update.form.menus.push(element.MenuId);
        });
      });
    },
    handleDelete(index, row) {
      role({ id: row.id }, "DELETE").then(res => {
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