<template>
  <div>
    <el-button @click="handleAdd()">添加</el-button>
    <Add ref="add"></Add>
    <Update ref="update"></Update>
    <el-divider></el-divider>
    <treeTable
      :list="bookmark"
      @handleEdit="handleEdit"
      @handleDelete="handleDelete"
      @change="change"
      :columns="columns"
    >
      <template #is_hide="scope">
        <span v-if="scope.row.is_hide == 1">显示</span>
        <span v-else>隐藏</span>
      </template>

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
  mounted() {
    this.$api.backend.bookmark().then((res) => {
      this.bookmark = res.data.data;
    });
  },
  computed: {},
  data() {
    return {
      columns: [
        {
          label: "名称",
          prop: "name",
        },
        {
          label: "路由",
          prop: "url",
        },
        {
          label: "隐藏",
          prop: "is_hide",
          slot: true, // 这里表示自定义列
        },
        {
          label: "操作",
          prop: "operator",
          slot: true, // 这里表示自定义列
        },
      ],
      bookmark: [],
    };
  },
  methods: {
    handleAdd() {
      this.$refs.add.dialogFormVisible = true;
    },
    handleEdit(index, row) {
      this.$refs.update.dialogFormVisible = true;
      this.$refs.update.bookmark = this.bookmark;
      this.$refs.update.form = row;
    },
    handleDelete(index, row) {
      this.$api.backend.bookmark({ id: row.id }, "DELETE").then((res) => {
        if (res.data.code == 0) {
          this.$router.replace("/refresh");
          this.$message({ message: "删除成功", type: "success" });
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    change(table) {
      this.bookmark = table;
    },
  },
  components: {
    Update,
    Add,
    treeTable,
  },
};
</script>