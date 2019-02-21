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
    >
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
      />
      <el-table-column label="操作" align="center" min-width="110px" fixed="right">
        <template slot-scope="scope">
          <v-btn
            :key="index"
            :color="btn.color"
            v-for="(btn,index) in getShowButton"
            small
            dark
            @click.stop="handleOperation(btn.Fun,scope.row.id)"
          >
            {{btn.label}}
            <v-icon>{{btn.icon}}</v-icon>
          </v-btn>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
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
import operation from './handleButton.js';

export default {
  name: 'CommonTable',
  props: {
    list: {
      type: Array, // 展示数据
      default: () => [],
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
    handleButton: {
      // 操作列的默认按钮  (编辑 删除 查看)
      type: String,
      default: 'edit,delete,detail',
    },
  },
  data() {
    return {
      operation,
    };
  },
  computed: {
    getShowButton() {
      return this.operation.filter(element => this.handleButton.includes(element.name));
    },
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.$emit('handleSizeChange', this.listQuery);
    },
    handleCurrentChange(val) {
      this.listQuery.pageNumber = val;
      this.$emit('handleCurrentChange', this.listQuery);
    },
    handleOperation(eventName, id) {
      this.$emit(eventName, id);
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
