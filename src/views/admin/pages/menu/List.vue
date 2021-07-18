<template>
  <div>
    <el-button @click="handleAdd()">添加</el-button>
    <el-button @click="resetRoute()">重置路由缓存</el-button>
    <Add ref="add"></Add>
    <Update ref="update"></Update>
    <el-divider></el-divider>

    <treeTable :list="list" :columns="columns">
      <template #icon="scope">
        <i :class="scope.row.icon"></i>
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
import dynamicRouter from "@/router/backend.js";
import treeTable from "@/components/Table/TreeTable.vue";

export default {
  mounted() {
    this.$api.backend.menuList().then((res) => {
      this.menu = res.data.data;
      this.list = res.data.data[0].children;
    });
  },
  computed: {},
  data() {
    return {
      columns: [
        {
          label: "URL",
          prop: "url",
        },
        {
          label: "组件路径",
          prop: "component",
        },
        {
          label: "图标",
          prop: "icon",
          slot: true, // 这里表示自定义列
        },
        {
          label: "Action",
          prop: "pid",
        },
      ],
      list: [],
      menu: [],
    };
  },
  methods: {
    handleAdd() {
      this.$refs.add.dialogFormVisible = true;
    },
    handleEdit(index, row) {
      this.$refs.update.dialogFormVisible = true;
      this.$refs.update.menu = this.menu;
      this.$refs.update.form = Object.assign({}, row, {
        parent_id: row.pid,
        operate_type: row.operate_type,
      });
      this.$refs.update.parent_id = row.pid;
    },
    handleDelete(index, row) {
      this.$api.backend.menu({ id: row.id }, "DELETE").then((res) => {
        if (res.data.code == 0) {
          this.$router.replace("/refresh");
          this.$message({ message: "删除成功", type: "success" });
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    change(table) {
      this.list = table;
    },
    resetRoute() {
      dynamicRouter();
    },
  },
  components: {
    Update,
    Add,
    treeTable,
  },
};
</script>