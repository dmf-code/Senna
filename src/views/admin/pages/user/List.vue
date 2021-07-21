<template>
  <div>
    <el-button @click="handleAdd()">添加</el-button>
    <Add ref="add"></Add>
    <Update ref="update"></Update>
    <ResetPassword ref="resetPassword"></ResetPassword>
    <el-divider></el-divider>

    <treeTable :list="list" :columns="columns">
      <template #updated_at="scope">
        <span style="margin-left: 10px">{{
          scope.row.updated_at != "0001-01-01 00:00:00"
            ? scope.row.updated_at
            : "未更新"
        }}</span>
      </template>
      <template #operator="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handlePassword(scope.$index, scope.row)"
          >重置密码</el-button
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
import ResetPassword from "./ResetPassword.vue";
import treeTable from "@/components/Table/TreeTable.vue";

export default {
  created() {
    this.$api.backend.admin().then((res) => {
      if (res.data.code == 0) {
        this.list = res.data.data;
      }
    });
  },
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
          label: "创建时间",
          prop: "created_at",
        },
        {
          label: "更新时间",
          prop: "updated_at",
          slot: true,
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
      // row.role_ids = row.role_ids.split(",");
      this.$refs.update.form = row;
    },
    handlePassword(index, row) {
      this.$refs.resetPassword.dialogFormVisible = true;
      this.$refs.resetPassword.row = row;
    },
    handleDelete(index, row) {
      this.$api.backend.admin({ id: row.id }, "DELETE").then((res) => {
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
    ResetPassword,
    treeTable,
  },
};
</script>