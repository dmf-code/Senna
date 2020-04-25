<template>
  <div>
    <div style="text-align: center;margin-bottom: 30px">
      <el-button
        type="primary"
        @click="foldList = []"
        :disabled="foldList.length === 0"
        size="small"
        style="margin-right: 30px"
      >全部展开</el-button>
      <el-button
        type="primary"
        @click="foldList = foldAllList"
        :disabled="foldList === foldAllList"
        size="small"
      >全部折叠</el-button>
    </div>
    <el-table
      :data="tableListData"
      :row-class-name="toggleDisplayTr"
      border
      stripe
      class="init_table"
    >
      <el-table-column align="center" width="55" type="index" label="序号"></el-table-column>
      <el-table-column align="center" width="55" prop="id" label="ID"></el-table-column>
      <el-table-column label="权限名称" min-width="200" show-overflow-tooltip align="left">
        <template slot-scope="scope">
          <p :style="`margin-left: ${scope.row.__level * 20}px;margin-top:0;margin-bottom:0`">
            <i
              @click="toggleFoldingStatus(scope.row)"
              class="permission_toggleFold"
              :class="toggleFoldingClass(scope.row)"
            ></i>
            {{scope.row.name}}
          </p>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" width="90" prop="__level" label="层级"></el-table-column> -->
      <!-- <el-table-column align="left" prop="__identity" label="节点标识"></el-table-column> -->
      <el-table-column align="center" width="90" prop="url" label="URL"></el-table-column>

      <el-table-column align="center" width="90" prop="component" label="组件路径"></el-table-column>

      <el-table-column align="center" width="80" label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="pid" width="100" label="Action"></el-table-column>

      <el-table-column align="center" width="100" label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  props: ["list"],
  data: () => ({
    tableListData: [], // tableListData 展示数据的data
    foldList: [] // 该数组中的值 都会在列表中进行隐藏  死亡名单
  }),
  computed: {
    foldAllList() {
      return this.tableListData.map(x => x.__identity);
    }
  },
  methods: {
    toggleFoldingStatus(params) {
      this.foldList.includes(params.__identity)
        ? this.foldList.splice(this.foldList.indexOf(params.__identity), 1)
        : this.foldList.push(params.__identity);
    },
    toggleDisplayTr({ row, index }) {
      for (let i = 0; i < this.foldList.length; i++) {
        let item = this.foldList[i];
        if (row.__family.includes(item) && row.__identity !== item) {
          return "row_hiddle";
        }
      }
      return "";
    },
    toggleFoldingClass(params) {
      // 判断是否存在 children 属性
      if ("children" in params == false) {
        return "permission_placeholder";
      }

      return params.children.length === 0
        ? "permission_placeholder"
        : this.foldList.indexOf(params.__identity) === -1
        ? "el-icon-folder-opened"
        : "el-icon-folder";
    },
    formatConversion(
      parent,
      children,
      index = 0,
      family = [],
      elderIdentity = "x"
    ) {
      if (children.length > 0) {
        children.map((x, i) => {
          // 设置 __level 标志位 用于展示区分层级
          Vue.set(x, "__level", index);
          // 设置 __family 为家族关系 为所有父级，包含本身在内
          Vue.set(x, "__family", [...family, elderIdentity + "_" + i]);
          // 本身的唯一标识  可以理解为个人的身份证咯 一定唯一。
          Vue.set(x, "__identity", elderIdentity + "_" + i);
          parent.push(x);
          // 如果仍有子集，则进行递归
          if ("children" in x && x.children.length > 0)
            this.formatConversion(
              parent,
              x.children,
              index + 1,
              [...family, elderIdentity + "_" + i],
              elderIdentity + "_" + i
            );
        });
      }
      return parent;
    },
    handleEdit(index, row) {
      this.$emit("handleEdit", index, row);
    },
    handleDelete(index, row) {
      this.$emit("handleDelete", index, row);
    }
  },
  created() {},
  watch: {
    list() {
      this.tableListData = this.formatConversion([], this.list);
    }
  }
};
</script>

<style>
.row_hiddle {
  display: none;
}
</style>