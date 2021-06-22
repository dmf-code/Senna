<template>
  <div>
    <el-button @click="handleAdd()">添加</el-button>
    <el-button @click="resetRoute()">重置路由缓存</el-button>
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
      <template slot="icon" slot-scope="scope">
        <i :class="scope.row.icon"></i>
      </template>
    </treeTable>
  </div>
</template>

<script>
import Update from "@/views/admin/pages/menu/Update";
import Add from "@/views/admin/pages/menu/Add";
import treeTable from "@/components/Table/TreeTable";
import dynamicRouter from "@/router/backend";
export default {
  mounted() {
    this.$api.backend.menuList().then((res) => {
      this.menu = res.data.data;
      this.table = res.data.data[0].children;
    });
  },
  computed: {},
  data() {
    return {
      tableOption: [
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
      table: [],
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
      this.$refs.update.parent_id = [row.pid];
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
      this.table = table;
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