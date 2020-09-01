<template>
  <div>
    <el-dialog title="菜单列表" :visible.sync="outerVisible" :fullscreen="true">
      <el-button @click="handleAdd">添加教程菜单</el-button>
      <Add ref="add" @refresh="refresh"></Add>
      <Update ref="update" @refresh="refresh"></Update>
      <TreeTable
        :tableData="table"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
        @change="change"
        :tableOption="tableOption"
      ></TreeTable>

      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="outerVisible = false">返回</el-button> -->
        <!-- <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Add from "@/views/admin/pages/tutorial/Menu/Add";
import Update from "@/views/admin/pages/tutorial/Menu/Update";
import TreeTable from "@/components/Table/TreeTable";
export default {
  created() {},
  data() {
    return {
      initRow: null,
      menu: {},
      table: [],
      tableOption: [
        {
          label: "标题",
          prop: "name"
        },
        {
          label: "pid",
          prop: "pid"
        }
      ],
      outerVisible: false,
      addVisible: false
    };
  },
  methods: {
    init(row) {
      this.initRow = row;
      this.$api.backend.tutorialList({ pid: row.id }).then(res => {
        if (res.data.status == true) {
          this.table = res.data.data;
          console.log("menuList", res);
          console.log("row", row);
          this.menu.label = row.title;
          this.menu.value = row.id;
          this.menu.children = this.table;
        }
      });
    },
    handleAdd() {
      this.addVisible = true;
      this.$refs.add.dialogFormVisible = true;
      this.$refs.add.init(this.initRow);
      this.$refs.add.menu = [this.menu];
    },
    handleEdit(index, row) {
      this.$refs.update.dialogFormVisible = true;
      this.$refs.update.menu = [this.menu];
      this.$refs.update.form = Object.assign({}, row, { parent_id: row.pid });
    },
    handleDelete(index, row) {
      this.$api.backend.tutorial({ id: row.id }, "DELETE").then(res => {
        if (res.data.status == true) {
          this.refresh();
          this.$message({ message: "删除成功", type: "success" });
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    change(table) {
      this.table = table;
    },
    refresh() {
      this.init(this.initRow);
    }
  },
  components: {
    TreeTable,
    Add,
    Update
  }
};
</script>

<style>
</style>