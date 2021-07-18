<template>
  <el-table
    :data="list"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    default-expand-all
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <template v-for="(column, index) in columns" :key="index">
      <el-table-column
        :label="column.label"
        :prop="column.prop"
        :align="column.align || 'center'"
        :show-overflow-tooltip="column.overHidden || true"
      >
        <template v-slot="scope">
          <slot
            v-if="column.slot"
            :name="scope.column.property"
            :row="scope.row"
            :$index="scope.$index"
          />
          <span v-else>{{ scope.row[scope.column.property] }}</span>
        </template>
      </el-table-column>
      <!-- <slot v-if="column.slot" :name="column.prop" :row="column"></slot> -->
    </template>
  </el-table>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: function () {
        return [];
      },
    },
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data: () => ({}),
  methods: {},
};
</script>

<style>
.row_hiddle {
  display: none;
}
</style>