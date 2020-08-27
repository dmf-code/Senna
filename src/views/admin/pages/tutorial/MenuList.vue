<template>
  <div>
    <el-dialog title="菜单列表" :visible.sync="outerVisible" :fullscreen="true">
      <el-dialog width="30%" title="内层 Dialog" :visible.sync="innerVisible" append-to-body>
        <TMenu ref="menu"></TMenu>
      </el-dialog>

      <TreeTable
        :tableData="table"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
        @change="change"
        :tableOption="tableOption"
      ></TreeTable>

      <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TMenu from "@/views/admin/pages/tutorial/Menu";
import TreeTable from "@/components/Table/TreeTable";
export default {
  created() {},
  data() {
    return {
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
      innerVisible: false
    };
  },
  methods: {
    init(row) {
      this.$api.backend.tutorialList({ pid: row.id }).then(res => {
        if (res.data.status == true) {
          this.table = res.data.data;
          console.log("menuList", res);
        }
      });
    },
    handleEdit(index, row) {
      this.$refs.update.dialogFormVisible = true;
      this.$refs.update.menu = this.menu;
      this.$refs.update.form = Object.assign({}, row, { parent_id: row.pid });
    },
    handleDelete(index, row) {
      this.$api.backend.menu({ id: row.id }, "DELETE").then(res => {
        if (res.data.status == true) {
          this.$router.replace("/refresh");
          this.$message({ message: "删除成功", type: "success" });
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    change(table) {
      this.table = table;
    }
  },
  components: {
    TreeTable,
    TMenu
  }
};
</script>

<style>
</style>