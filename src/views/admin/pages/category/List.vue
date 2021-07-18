<template>
  <div>
    <el-button @click="handleAdd()">添加</el-button>
    <Add ref="add"></Add>
    <Update ref="update"></Update>
    <el-divider></el-divider>
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
  </div>
</template>

<script>
import Update from "./Update.vue";
import Add from "./Add.vue";
import treeTable from "@/components/Table/TreeTable.vue";
export default {
  created() {
    this.$api.backend.category().then((res) => {
      if (res.data.code == 0) {
        this.list = res.data.data;
      }
    });
  },
  computed: {},
  data() {
    return {
      list: [],
      columns: [
        {
          label: "ID",
          prop: "id",
        },
        {
          label: "名称",
          prop: "name",
        },
        {
          label: "引用次数",
          prop: "num",
        },
        {
          label: "操作",
          prop: "operator",
          slot: true,
        },
      ],
    };
  },
  methods: {
    handleAdd() {
      this.$refs.add.dialogFormVisible = true;
    },
    handleEdit(index, row) {
      this.$refs.update.dialogFormVisible = true;
      this.$refs.update.form = row;
    },
    handleDelete(index, row) {
      this.$api.backend.category({ id: row.id }, "DELETE").then((res) => {
        if (res.data.code == 0) {
          this.$message({ message: "删除成功", type: "success" });
          this.$router.replace("/refresh");
        } else {
          this.$message.error("删除失败");
        }
      });
    },
  },
  components: {
    Update,
    Add,
    treeTable,
  },
};
</script>