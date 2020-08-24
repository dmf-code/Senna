<template>
  <div>
    <el-dialog title="菜单列表" :visible.sync="outerVisible" :fullscreen="true">
      <el-dialog width="30%" title="内层 Dialog" :visible.sync="innerVisible" append-to-body>
        <TMenu ref="menu"></TMenu>
      </el-dialog>

      <TreeTable></TreeTable>

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
  data() {
    return {
      outerVisible: false,
      innerVisible: false
    };
  },
  methods: {
    init(row) {}
  },
  components: {
    TreeTable,
    TMenu
  }
};
</script>

<style>
</style>