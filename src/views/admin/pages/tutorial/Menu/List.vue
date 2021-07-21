<template>
  <div>
    <el-dialog title="菜单列表" v-model="outerVisible" :fullscreen="true">
      <el-button @click="handleAdd">添加教程菜单</el-button>
      <Add ref="add" @refresh="refresh"></Add>
      <Update ref="update" @refresh="refresh"></Update>

      <treeTable :list="list" :columns="columns">
        <template #operator="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </treeTable>
    </el-dialog>
  </div>
</template>

<script>
import Add from "./Add.vue";
import Update from "./Update.vue";
import treeTable from "@/components/Table/TreeTable.vue";
export default {
  data() {
    return {
      initRow: null,
      menu: {},
      list: [],
      columns: [
        {
          label: "标题",
          prop: "name",
        },
        {
          label: "pid",
          prop: "pid",
        },
        {
          label: "操作",
          prop: "operator",
          slot: true,
        },
      ],
      outerVisible: false,
      addVisible: false,
    };
  },
  methods: {
    init(row) {
      this.initRow = row;
      this.$api.backend.tutorialList({ pid: row.id }).then((res) => {
        if (res.data.code == 0) {
          this.list = res.data.data ? res.data.data : [];
          this.menu.label = row.title;
          this.menu.value = row.id;
          this.menu.children = this.list;
        }
      });
    },
    handleAdd() {
      this.addVisible = true;
      this.$refs.add.dialogFormVisible = true;
      this.$refs.add.menu = [this.menu];
    },
    handleEdit(index, row) {
      this.$refs.update.dialogFormVisible = true;
      this.$refs.update.menu = [this.menu];
      this.$refs.update.parent_id = Number(row.pid);
      this.$refs.update.form = Object.assign({}, row, {
        parent_id: Number(row.pid),
      });
    },
    handleDelete(index, row) {
      this.$api.backend.tutorial({ id: row.id }, "DELETE").then((res) => {
        if (res.data.code == 0) {
          this.refresh();
          this.$message({ message: "删除成功", type: "success" });
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    change(table) {
      this.list = table;
    },
    refresh() {
      this.init(this.initRow);
      return true;
    },
  },
  components: {
    Add,
    Update,
    treeTable,
  },
};
</script>

<style>
</style>