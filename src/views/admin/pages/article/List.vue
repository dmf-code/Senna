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

    <div class="block" style="margin-top: 1em; width: 100%; text-align: center">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model:currentPage="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Update from "./Update.vue";
import Add from "./Add.vue";
import treeTable from "@/components/Table/TreeTable.vue";
export default {
  created() {
    this.page();

    this.$api.backend.category().then((res) => {
      if (res.data.code == 0) {
        this.categorys = res.data.data;
      } else {
        this.categorys = [];
      }
    });
    this.$api.backend.tag().then((res) => {
      if (res.data.code == 0) {
        this.tags = res.data.data;
      } else {
        this.tags = [];
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
          prop: "title",
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
      categorys: [],
      tags: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
    handleAdd() {
      this.$refs.add.dialogFormVisible = true;
      this.$refs.add.form.categorys = this.categorys;
      this.$refs.add.form.tags = this.tags;
    },
    handleEdit(index, row) {
      this.$refs.update.dialogFormVisible = true;
      row.checkedCategorys = Number(row.categoryIds);

      row.checkedTags = row.tagIds.split(",");
      this.$refs.update.categorys = this.categorys;
      this.$refs.update.tags = this.tags;
      this.$refs.update.form = row;
    },
    handleDelete(index, row) {
      this.$api.backend.article({ id: row.id }, "DELETE").then((res) => {
        if (res.data.code == 0) {
          this.$message({ message: "删除成功", type: "success" });
          this.$router.replace("/refresh");
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    page(page = 1, pageSize = 10) {
      this.$api.backend
        .article({ page: page, page_size: pageSize })
        .then((res) => {
          if (res.data.code == 0) {
            this.list = res.data.data.items;
            this.currentPage = res.data.data.page;
            this.pageSize = res.data.data.page_size;
            this.total = res.data.data.total;
          }
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.page(this.currentPage, this.pageSize);
    },
  },
  components: {
    Update,
    Add,
    treeTable,
  },
};
</script>