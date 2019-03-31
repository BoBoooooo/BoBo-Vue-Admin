<!--
 * @Author: BoBo
 * @Date: 2019-01-03 14:06:28
 * @Description:

   基于el-table进行二次封装 , 待优化。
   结合[表格设计]模块json,进行table动态渲染。

 -->
<template>
  <div>
    <el-table
      v-loading.body="listLoading"
      :default-sort="{prop: 'name', order: 'descending'}"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
      @selection-change="selection => emitEvent('selection-change', selection)"
      @row-click="(row, event, column) => emitEvent('row-click', row, event, column)"
    >
     <el-table-column
        v-if="IsMultiple"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        v-for="(item,index) in tableJson"
        :key="index"
        :label="item.label"
        :prop="item.prop||item.prop_more"
        :align="item.align"
        :sortable="item.sortable"
        :width="item.width"
        :min-width="item.min_width"
        :header-align="item.header_align"
        :show-overflow-tooltip="item.show_overflow_tooltip"
      >
        <template slot-scope="scope">
            <template v-if="item.slotName">
            <slot :name="item.slotName"
                  :row="scope.row"
                  :prop="item.prop"
                  :$index="scope.$index" />
          </template>
          <template  v-else>
            <span>
            {{ scope.row[item.prop] }}
          </span>

          </template>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="showPagination"
      :current-page="listQuery.pageNumber"
      :page-size="listQuery.pageSize"
      :total="listQuery.totalCount"
      :page-sizes="[10, 20, 30]"
      style="margin-top:5px"
      layout="total,sizes, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'CommonTable',
  props: {
    list: {
      type: Array, // 展示数据
      default: () => [],
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
    IsMultiple: {
      type: Boolean,
      default: false,
    },
    tableJson: {
      type: Array, // 列表配置json
      default: () => [],
    },
    listLoading: {
      // 正在加载
      type: Boolean,
      default: true,
    },
    listQuery: {
      // 列表查询以及分页参数
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    emitEvent(...args) {
      this.$emit(args[0], ...Array.from(args).slice(1));
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.$emit('handleSizeChange', this.listQuery);
    },
    handleCurrentChange(val) {
      this.listQuery.pageNumber = val;
      this.$emit('handleCurrentChange', this.listQuery);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table th,
.el-table tr.table-header-row {
  background: #e5c5d2; /* 示例， 对表格样式上的修饰 */
}
.v-btn {
  min-width: unset !important;
  width: 50px !important;
}
</style>
