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
    menuList().then(res => {
      this.menu = res.data.data;
      this.table = res.data.data[0].children;
    });
  },
  computed: {},
  data() {
    return {
      tableData: null,
      table: [],
      menu: []
    };
  },
  methods: {
    handleAdd() {
      this.$refs.add.dialogFormVisible = true;
    },
    handleEdit(index, row) {
      this.$refs.update.dialogFormVisible = true;
      this.$refs.update.menu = this.menu;
      console.log("menu ", this.menu);
      this.$refs.update.form = Object.assign({}, row, { parent_id: row.pid });
      console.log("List", row);
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