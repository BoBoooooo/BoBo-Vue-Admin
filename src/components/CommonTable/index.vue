<template>
  <div class="app-container">
    <ElTable
      v-loading.body="listLoading"
      :default-sort="{prop: 'name', order: 'descending'}"
      :data="list"
      element-loading-text="拼命加载中"
      border
      fit
      highlight-current-row
    >
      <ElTableColumn
        v-for="(item,index) in tableJson"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        :align="item.align"
        :sortable="item.sortable"
        :width="item.width"
        :min-width="item.min_width"
        :header-align="item.header_align"
        :show-overflow-tooltip="item.show_overflow_tooltip"
      />
      <ElTableColumn
        label="操作"
        align="center"
        min-width="110px"
      >
        <template slot-scope="scope">
          <ElButton
            type="primary"
            icon="el-icon-edit"
            circle
            @click="Edit(scope.row.id)"
          />
          <ElButton
            type="danger"
            icon="el-icon-delete"
            circle
            @click="Delete(scope.row.id)"
          />
        </template>
      </ElTableColumn>
    </ElTable>
    <ElPagination
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
      default: () => ([]),
    },
    tableJson: {
      type: Array, // 列表配置json
      default: () => ([]),

    },
    listLoading: { // 正在加载
      type: Boolean,
      default: true,
    },
    listQuery: {
      type: Object,
      default: () => ({}),
    },

  },
  methods: {

    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.$emit('Refresh', this.listQuery)
    },
    handleCurrentChange(val) {
      this.listQuery.pageNumber = val
      this.$emit('handleCurrentChange', this.listQuery)
    },

    Edit(id) {
      this.$emit('Edit', id)
    },
    Delete(id) {
      this.$emit('Delete', id)
    },
  },
}
</script>

<style lang="scss" scoped>
.el-table th,
.el-table tr.table-header-row {
  background: #e5c5d2; /* 示例， 对表格样式上的修饰 */
}
</style>
