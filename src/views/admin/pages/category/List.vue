<template>
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

    <Update ref="dialog"></Update>
  </el-table>
</template>

<script>
import Update from "@/views/admin/pages/category/Update";
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
      this.axios.get("/api/backend/category").then(response => {
        if (response.data.status == true) {
          this.tableData = response.data.data.list;
        }
      });
    },
    handleEdit(index, row) {
      this.$refs.dialog.dialogFormVisible = true;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  components: {
    Update
  }
};
</script>