<template>
  <el-row>
    <el-col :span="6">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

      <el-tree
        class="filter-tree"
        :data="data"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        :highlight-current="true"
        @node-click="nodeClick"
        ref="tree"
      ></el-tree>
    </el-col>
    <el-col :span="18">
      <el-button @click="handleAdd()">添加</el-button>
      <Add ref="add"></Add>
      <Update ref="update"></Update>
      <el-divider></el-divider>
      <treeTable :list="table" @handleEdit="handleEdit" @handleDelete="handleDelete"></treeTable>
    </el-col>
  </el-row>
</template>

<script>
import Update from "@/views/admin/pages/tutorial/menu/Update";
import Add from "@/views/admin/pages/tutorial/menu/Add";
import treeTable from "@/components/Table/TreeTable";
import { coverMenuList } from "@/apis/backend/index";

export default {
  created: function() {
    coverMenuList().then(res => {
      console.log(res);
      if (res.data.status == true) {
        this.data[0].children = res.data.data;
      }
    });
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    return {
      tableData: null,
      table: [],
      menu: [],
      resourceCheckedKey: [1],
      filterText: "",
      data: [{ id: -1, label: "教程", children: [] }],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    nodeClick(item, node, cpnt) {
      console.log("into");
      console.log(item);
      console.log(node);
      console.log(cpnt);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleAdd() {
      this.$refs.add.dialogFormVisible = true;
    },
    handleEdit(index, row) {
      this.$refs.update.dialogFormVisible = true;
      this.$refs.update.menu = this.menu;
      console.log("menu ", this.menu);
      this.$refs.update.form = Object.assign({}, row, { parent_id: row.pid });
      console.log("List", row);
    },
    handleDelete(index, row) {
      menu({ id: row.id }, "DELETE").then(res => {
        if (res.data.status == true) {
          this.$router.replace("/refresh");
          this.$message({ message: "删除成功", type: "success" });
        } else {
          this.$message.error("删除失败");
        }
      });
    }
  },
  components: {
    Update,
    Add,
    treeTable
  }
};
</script>

<style>
.el-tree-node:focus > .el-tree-node__content {
  background-color: #66b1ff87 !important;
}
.el-tree-node__content:hover {
  background-color: #66b1ff87;
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #66b1ff87;
}

.el-tree-node__label {
  font-size: 16px;
}
</style>