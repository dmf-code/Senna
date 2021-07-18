<template>
  <div>
    <el-dialog title="菜单列表" v-model="outerVisible" :fullscreen="true">
      <el-button @click="handleAdd">添加教程菜单</el-button>
      <Add ref="add" @refresh="refresh"></Add>
      <Update ref="update" @refresh="refresh"></Update>
    </el-dialog>
  </div>
</template>

<script>
import Add from "./Add.vue";
import Update from "./Update.vue";
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
          prop: "name",
        },
        {
          label: "pid",
          prop: "pid",
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
          this.table = res.data.data ? res.data.data : [];
          this.menu.label = row.title;
          this.menu.value = row.id;
          this.menu.children = this.table;
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
      this.$refs.update.parent_id = [row.pid];
      this.$refs.update.form = Object.assign({}, row, { parent_id: row.pid });
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
      this.table = table;
    },
    refresh() {
      console.log(this.initRow);
      this.init(this.initRow);
    },
  },
  components: {
    Add,
    Update,
  },
};
</script>

<style>
</style>