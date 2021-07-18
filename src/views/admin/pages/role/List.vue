<template>
  <div>
    <el-button @click="handleAdd()">添加</el-button>
    <Add ref="add"></Add>
    <Update ref="update"></Update>
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
    this.$api.backend.role().then((res) => {
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
          label: "备注",
          prop: "memo",
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
      this.$api.backend
        .roleMenuList("/api/backend/roleMenuList?roleId=" + row.id, {}, "GET")
        .then((res) => {
          this.$refs.update.form = row;
          this.$refs.update.form.menus = [];
          this.$refs.update.dialogFormVisible = true;
          res.data.data.forEach((element) => {
            this.$refs.update.form.menus.push(element.MenuId);
          });
        });
    },
    handleDelete(index, row) {
      this.$api.backend.role({ id: row.id }, "DELETE").then((res) => {
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