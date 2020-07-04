<template>
  <div>
    <el-button @click="handleAdd()">添加</el-button>
    <Add ref="add"></Add>
    <Update ref="update"></Update>
    <el-divider></el-divider>
    <treeTable :list="table" @handleEdit="handleEdit" @handleDelete="handleDelete"></treeTable>
  </div>
</template>

<script>
import Update from "@/views/admin/pages/menu/Update";
import Add from "@/views/admin/pages/menu/Add";
import treeTable from "@/components/Table/TreeTable";
import { menu, menuList } from "@/apis/backend/index";
export default {
  mounted() {
    menu().then(response => {
      if (response.data.status == true) {
        this.tableData = response.data.data;
      }
    });

    menuList().then(res => {
      this.table = res.data.data[0].children;
    });
  },
  computed: {},
  data() {
    return {
      tableData: null,
      table: []
    };
  },
  methods: {
    handleAdd() {
      this.$refs.add.dialogFormVisible = true;
    },
    handleEdit(index, row) {
      console.log(this.$refs);
      console.log(this.$refs.update);
      this.$refs.update.dialogFormVisible = true;
      this.$refs.update.form = row;
    },
    handleDelete(index, row) {
      menu({ id: row.id }, "DELETE").then(res => {
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
    Add,
    treeTable
  }
};
</script>