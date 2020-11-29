<template>
  <div>
    <el-button @click="handleAdd()">添加</el-button>
    <Add ref="add"></Add>
    <Update ref="update"></Update>
    <el-divider></el-divider>
    <treeTable
      :tableData="table"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
      @change="change"
      :tableOption="tableOption"
    >
      <template slot="is_hide" slot-scope="scope">
        <span v-if="scope.row.is_hide == 1">隐藏</span>
        <span v-else>显示</span>
      </template>
    </treeTable>
  </div>
</template>

<script>
import Update from "@/views/admin/pages/ui/nav/Update";
import Add from "@/views/admin/pages/ui/nav/Add";
import treeTable from "@/components/Table/TreeTable";
export default {
  mounted() {
    this.$api.backend.nav().then((res) => {
      this.nav = res.data.data;
      this.table = res.data.data;
    });
  },
  computed: {},
  data() {
    return {
      tableOption: [
        {
          label: "路由path",
          prop: "path",
        },
        {
          label: "隐藏",
          prop: "is_hide",
          slot: true, // 这里表示自定义列
        },
      ],
      table: [],
      nav: [],
    };
  },
  methods: {
    handleAdd() {
      this.$refs.add.dialogFormVisible = true;
    },
    handleEdit(index, row) {
      this.$refs.update.dialogFormVisible = true;
      this.$refs.update.nav = this.nav;
      this.$refs.update.form = row;
    },
    handleDelete(index, row) {
      this.$api.backend.nav({ id: row.id }, "DELETE").then((res) => {
        if (res.data.code == 0) {
          this.$router.replace("/refresh");
          this.$message({ message: "删除成功", type: "success" });
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    change(table) {
      this.table = table;
    },
  },
  components: {
    Update,
    Add,
    treeTable,
  },
};
</script>