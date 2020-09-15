<!--
@file BaseTable.vue基于el-table二次封装，支持高级查询、分页、动态生成表头
      参考 https://zhuanlan.zhihu.com/p/31990840
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2018年11月14日10:00:37
-->

<template>
  <div class="base-table">
    <div class="table-title"
         v-if="view.tableTitle && tableTitle">
      <!-- 表格标题 -->
      <h4>{{tableTitle}}</h4>
    </div>
    <div class="btn-bar">
      <!-- 自定义前置按钮 -->
      <slot name="btnBarPrevBtn" />
      <!-- 添加 -->
      <slot name="btnAdd" />
    </div>

    <SearchForm ref="searchForm"
                v-if="view.searchForm"
                :columns="columns"
                @click="fetchHandler(false,true)"
                :searchFormCondition.sync="searchFormCondition"
                :remoteFuncs="remoteFuncs"
                :isLoading="loading"
                @clear="dataChangeHandler(true)">
    </SearchForm>
    <!-- 表格主体 -->
    <el-table v-loading.lock="loading"
              element-loading-text="加载中……"
              ref="table"
              :header-cell-style="{ background: '#f2f2f2', color: '#737373' }"
              :data="tableData"
              :border="border"
              :size="size"
              :stripe="stripe"
              :height="tableHeight"
              :max-height="maxHeight"
              :fit="fit"
              :show-header="showHeader"
              :highlight-current-row="highlightCurrentRow"
              :current-row-key="currentRowKey"
              :row-class-name="rowClassName"
              :row-style="rowStyle"
              :cell-style="cellStyle"
              :empty-text="emptyText"
              :default-expand-all="defaultExpandAll"
              :expand-row-keys="expandRowKeys"
              :default-sort="defaultSort"
              :tooltip-effect="tooltipEffect"
              :show-summary="showSummary"
              :sum-text="sumText"
              :row-key="(row)=> row.id"
              :summary-method="summaryMethod"
              rowKey="id"
              :style="tableStyle"
              @select="(selection, row) => emitEventHandler('select', selection, row)"
              @select-all="(selection) => emitEventHandler('select-all', selection)"
              @selection-change="(selection) => emitEventHandler('selection-change', selection)"
              @cell-mouse-enter="(row, column, cell, event) => emitEventHandler('cell-mouse-enter', row, column, cell, event)"
              @cell-mouse-leave="(row, column, cell, event) => emitEventHandler('cell-mouse-leave', row, column, cell, event)"
              @cell-click="(row, column, cell, event) => emitEventHandler('cell-click', row, column, cell, event)"
              @cell-dblclick="(row, column, cell, event) => emitEventHandler('cell-dblclick', row, column, cell, event)"
              @row-click="(row, event, column) => emitEventHandler('row-click', row, event, column)"
              @row-dblclick="(row, event) => emitEventHandler('row-dblclick', row, event)"
              @row-contextmenu="(row, event) => emitEventHandler('row-contextmenu', row, event)"
              @header-click="(column, event) => emitEventHandler('header-click', column, event)"
              @sort-change="(args) => sortChange(args)"
              @filter-change="(filters) => emitEventHandler('filter-change', filters)"
              @current-change="(currentRow, oldCurrentRow) => emitEventHandler('current-change', currentRow, oldCurrentRow)"
              @header-dragend="(newWidth, oldWidth, column, event) => emitEventHandler('header-dragend', newWidth, oldWidth, column, event)"
              @expand-change="(row, expanded) => emitEventHandler('expand-change', row, expanded)">
      <template slot='empty'>
        <svgIcon icon-class='table_empty'
                 class="empty_icon"></svgIcon>
        <span>暂无数据</span>
      </template>
      <slot name="prepend" />
      <el-table-column v-if="isMultiple"
                       type="selection"
                       reserve-selection
                       align="center"
                       header-align="center"
                       width="55"
                       :selectable="selectableFunc"> </el-table-column>
      <el-table-column v-if="showColumnIndex"
                       type="index"
                       align="center"
                       label="#"
                       header-align="center"
                       width="50"> </el-table-column>
      <el-table-column v-for="(column, columnIndex) in columns"
                       :key="columnIndex"
                       :column-key="column.columnKey"
                       :prop="column.prop"
                       :label="column.label"
                       :width="column.minWidth ? '-' : column.width || 140"
                       :min-width="column.minWidth || column.width || 140"
                       :fixed="column.fixed"
                       :render-header="column.renderHeader"
                       :sortable="column.sortable == 'false' ? false : column.sortable"
                       :sort-by="column.sortBy"
                       :sort-method="column.method"
                       :resizable="column.resizable"
                       :formatter="column.formatter"
                       :show-overflow-tooltip="column.showOverflowTooltip"
                       :align="column.align"
                       :header-align="column.headerAlign || column.align"
                       :class-name="column.className"
                       :label-class-name="column.labelClassName"
                       :selectable="column.selectable"
                       :reserve-selection="column.reserveSelection"
                       :filters="column.filters"
                       :filter-placement="column.filterPlacement"
                       :filter-multiple="column.filterMultiple"
                       :filter-method="column.filterMethod"
                       :filtered-value="column.filteredValue">
        <!-- 此处暂时只考虑操作列表头的处理 -->
        <template slot="header">
          <slot name="columnHeader"
                :slotName="column.slotName"></slot>
        </template>
        <template slot-scope="scope">
          <span v-if="column.slotName">
            <slot :name="column.slotName"
                  :row="scope.row"
                  :prop="column.prop"
                  :$index="scope.$index" />
          </span>
          <span v-else>
            {{ scope.row[column.prop] }}
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="overflow:hidden;background:white"
         class="mt-8">
      <!-- 表格底部左侧功能按钮 -->
      <div style="float:left">
        <slot name="bottom-btn"></slot>
      </div>
      <el-pagination v-if="showPagination"
                     :current-page="pagination.pageIndex"
                     :page-sizes="pageSizes"
                     :page-size="pagination.pageSize"
                     :layout="paginationLayout"
                     :pager-count="pagerCount"
                     :small="pagerSmall"
                     :total="total"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     style="float:right" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Emit, Watch, Prop,
} from 'vue-property-decorator';
import { DML, crud } from '@/api/public/crud';
import SearchForm from './SearchForm.vue';

@Component({
  components: {
    SearchForm,
  },
})
export default class BaseTable extends Vue {
  // https://github.com/vuejs/vue-class-component/issues/94
  $refs!: {
    searchForm: HTMLFormElement;
    table: HTMLFormElement;
  };

  // 结果总数
  total = 0;

  // 是否在加载
  loading = false;

  // 表格数据
  tableData :any[]= [];

  // 排序参数
  sortParams = {
    orderCondition: '',
  };

  // 最大页码按钮数
  pagerCount = 7;

  // 是否显示小型分页
  pagerSmall = false;

  // 高级查询Condition
  searchFormCondition = [];

  // 表格最大高度
  maxHeight: string | number = '100%';

  // 表格高度
  tableHeight: number | string = '100%';

  // 是否需要多选
  @Prop({ default: false, type: Boolean }) isMultiple!: boolean;

  // 排序条件
  @Prop({ default: null, type: String }) orderCondition!: string;

  // 远程数据方法
  @Prop({ default: () => ({}), type: Object }) remoteFuncs!: any;

  // 内部元素显示控制
  @Prop({ default: () => ({}), type: Object }) visibleList!: any;

  // expandModel
  @Prop({ default: () => ({}), type: Object }) expandModel!: any;

  // 覆盖查询的promise
  @Prop({ default: null, type: Function }) promiseForSelect!:any;

  // Element UI Table 高度
  @Prop(Number) height!: number;

  // 是否自适应屏幕高度
  @Prop(Boolean) fullHeight!: boolean;

  // 高度minus
  @Prop(Number) maxHeightMinus!: number;

  // 远程数据方法
  @Prop(String) size!: string;

  // 斑马纹
  @Prop(Boolean) stripe!: boolean;

  // 边框线
  @Prop(Boolean) border!: boolean;

  // 远程数据方法
  @Prop({
    type: Boolean,
    default: true,
  }) fit!: boolean;

  // el-table showHeader
  @Prop({
    type: Boolean,
    default: true,
  }) showHeader!: boolean;

  // el-table highlightCurrentRow
  @Prop(Boolean) highlightCurrentRow!: boolean;

  // el-table currentRowKey
  @Prop([String, Function]) currentRowKey!: any;

  // el-table rowClassName
  @Prop([String, Function]) rowClassName!: any;

  // el-table rowStyle
  @Prop([String, Function]) rowStyle!: any;

  // el-table cellStyle
  @Prop([String, Function]) cellStyle!: any;

  // el-table rowKey
  @Prop([String, Function]) rowKey!: any;

  // el-table emptyText
  @Prop(String) emptyText!: string;

  // el-table defaultExpandAll
  @Prop(Boolean) defaultExpandAll!: boolean;

  // el-table expandRowKeys
  @Prop(Array) expandRowKeys!: any;

  // el-table defaultSort
  @Prop(Object) defaultSort!: any;

  // el-table tooltipEffect
  @Prop(String) tooltipEffect!: string;

  // el-table showSummary
  @Prop(Boolean) showSummary!: boolean;

  // el-table sumText
  @Prop(String) sumText!: string;

  // el-table summaryMethod
  @Prop(Function) summaryMethod!: any;

  // 自定义tableStyle
  @Prop({
    type: String,
    default: 'width:100%;',
  }) tableStyle!: string;


  // 请求url地址
  @Prop(String) url!: string;

  // listField
  @Prop({
    type: String,
    default: 'data.list',
  }) listField!: string;

  // totalField
  @Prop({
    type: String,
    default: 'data.total',
  }) totalField!: string;

  // tableParams 预设查询参数
  @Prop({
    type: [Object, Array],
    default: () => ({}),
  }) tableParams!: any;

  // 表格设计json
  @Prop({
    type: Array,
    required: true,
  }) columns: any;

  // 是否显示分页
  @Prop({ default: true, type: Boolean }) showPagination!: boolean;

  // 页码大小
  @Prop({ default: () => [20, 50, 100] }) pageSizes!: number[];

  // 分页显示
  @Prop({
    type: String,
    default: 'total, prev, pager, next, jumper, sizes',
  }) paginationLayout!: string;

  // pageIndexKey
  @Prop({ default: 'pageIndex', type: String }) pageIndexKey!: string;

  // pageSizeKey
  @Prop({ default: 'pageSize', type: String }) pageSizeKey!: string;

  // 选择行是否可选
  @Prop({ default: null, type: Function }) selectableFunc:any ;

  // 是否显示序号列
  @Prop({ default: false }) showColumnIndex!: boolean;

  // 表格标题
  @Prop({ default: '', type: String }) tableTitle!: string;


  // 内部元素显示控制
  get view() {
    return {
      searchForm: true,
      ...this.visibleList,
    };
  }

  // 分页
  get pagination() {
    return {
      pageIndex: 1,
      pageSize: ((): number => {
        const { pageSizes } = this;
        if (pageSizes.length > 0) {
          return pageSizes[0];
        }
        return 20;
      })(),
    };
  }


  mounted() {
    // event: expand changed to `expand-change` in Element v2.x
    this.$refs.table.$on('expand', (row, expanded) => this.emitEventHandler('expand', row, expanded));

    // 初始化表格高度
    this.setMaxHeight();
    // 请求数据
    this.fetchHandler(true);

    // 自适应分页组件按钮;
    window.addEventListener('resize', () => {
      this.setPagerByWidth();
      this.setMaxHeight();
    });
  }

  setMaxHeight() {
    const h = document.documentElement.clientHeight || document.body.clientHeight;
    this.maxHeight = Math.max(0, h - this.maxHeightMinus);
    this.tableHeight = this.fullHeight ? this.maxHeight : this.height;
  }

  // 根据表格宽度自动调整分页栏大小
  setPagerByWidth() {
    if (this.$refs.table && this.$refs.table.$el.clientWidth < 655) {
      this.pagerCount = 5;
      this.pagerSmall = true;
    } else {
      this.pagerCount = 7;
      this.pagerSmall = false;
    }
  }

  /**
   * 获取查询条件
   *
   * @param {Function} callback 查询条件会传给回调函数
   */
  getSearchCondition(callback) {
    if (this.$refs.searchForm) {
      callback(this.searchFormCondition);
    } else {
      callback([]);
    }
  }

  // pageSize改变事件
  handleSizeChange(size) {
    this.pagination.pageSize = size;
    this.dataChangeHandler();
  }

  // pageIndex改变事件
  handleCurrentChange(pageIndex) {
    this.pagination.pageIndex = pageIndex;
    this.dataChangeHandler();
  }

  dataChangeHandler(clearParams = false) {
    this.fetchHandler(clearParams);
  }

  fetchHandler(clearParams = false, resetPageIndex = false) {
    let searchCondition: any[] = [];
    this.loading = true;
    const {
      url, showPagination, pageIndexKey, pageSizeKey, pagination, listField, totalField,
    } = this;
    const { tableParams, searchFormCondition } = this;
    // 如果地址为空放弃请求
    if (url == null) {
      this.loading = false;
      return;
    }

    // 如清空查询条件,则清空
    if (clearParams) {
      searchCondition = [];
    } else {
      searchCondition = searchCondition.concat(searchFormCondition);
    }
    // 此处为外部传入的tableParams,不做清空处理!
    if (this.tableParams) {
      Object.keys(tableParams).forEach((k) => {
        searchCondition.push({
          field: k,
          operator: 'eq',
          value: tableParams[k],
        });
      });
      // 自定义表格参数合并到表单查询条件
      if (Array.isArray(tableParams)) {
        searchCondition = searchCondition.concat(tableParams);
      }
    }
    // 是否resetPageIndex
    if (resetPageIndex) {
      this.pagination.pageIndex = 1;
    }
    // 由于后端实体类接收，发送前必须确保所有属性都在
    const axiosParams = {
      orderCondition: '',
      searchCondition: [],
      pageIndex: 0,
      pageSize: 0,
    };
    Object.assign(axiosParams, { searchCondition });
    // 合并用于分页的两个参数
    if (showPagination) {
      Object.assign(axiosParams, {
        [pageIndexKey]: pagination.pageIndex,
        [pageSizeKey]: pagination.pageSize,
      });
    }
    // 合并排序参数
    if (this.sortParams.orderCondition !== '') {
      Object.assign(axiosParams, this.sortParams);
    } else if (this.orderCondition) {
      Object.assign(axiosParams, { orderCondition: this.orderCondition });
    }
    if (this.expandModel) {
      Object.assign(axiosParams, {
        expandModel: this.expandModel,
      });
    }
    // 发起请求
    const requestObject = this.promiseForSelect ? this.promiseForSelect(axiosParams, clearParams) : crud(DML.SELECT, url.split('/list')[0].replace(/\//g, '_'), axiosParams);

    requestObject
      .then((response) => {
        let result = response;
        // 此处判断返回的数据格式
        // 和后台默认约束好的resultBean格式如下:
        /**
         * {
         *    code: 200,
         *    data: {
         *      list: [],
         *      total: 0,
         *    };
         *    message: SUCCESS
         * }
         */
        if (response && !Array.isArray(response)) {
          // 此处listField默认为 data.list
          result = listField.split('.').reduce((res, key) => res[key], response);
        }
        // 判断拿到的list是否为Array
        if (!result || !Array.isArray(result)) {
          this.loading = false;
          throw new Error(`The result of key:${listField} is not Array.`);
        }
        // 拿到list数据
        this.tableData = result;
        // 以下代码 获取该列表总数
        let totalValue = response;
        // 如果返回直接为list,则说明没有分页处理,直接统计length作为总数
        if (Array.isArray(response)) {
          totalValue = response.length;
        } else if (typeof response === 'object') {
          // 此处totalField默认为data.total
          totalValue = totalField.split('.').reduce((res, key) => res[key], response);
        } else {
          totalValue = 0;
        }
        this.total = totalValue;
        this.loading = false;
        if (this.$refs.table) {
          // 获取到数据后清空已选项
          this.$refs.table.clearSelection();
        }
        this.$emit('done', this);
      })
      .catch((e) => {
        // 如果list查询方法由外部传入,无法获取到真实请求的URL,故隐藏
        let message = `URL：${url}，原因：${e.message}`;
        if (this.promiseForSelect) {
          message = `原因：${e.message}`;
        }
        this.$notify({
          title: '表格数据请求失败',
          message,
          duration: 5000,
        });
        this.loading = false;
      });
  }

  emitEventHandler(...args) {
    this.$emit(args[0], ...Array.from(args).slice(1));
  }

  /**
   * 排序条件发生变化的时候会触发该事件
   *
   * @param {Object} column 当前列
   * @param {Object} prop 当前列需要排序的数据
   * @param {Object} order 排序的规则（升序、降序和默认[默认就是没排序]）
   */
  sortChange(args) {
    const { prop, order } = args;
    const fieldOrder = order === 'ascending' ? 'asc' : 'desc';
    this.sortParams.orderCondition = prop ? `${prop} ${fieldOrder}` : '';
    // 也许外面还有要做的
    this.$emit('sort-change', args);
    // 最后再刷新表格
    this.dataChangeHandler();
  }
}
</script>
<style scoped>
/* 修复超窄表格使用small后select高于同行其他元素的问题 */
.base-table >>> .el-pagination--small .el-input--mini .el-input__inner {
  height: 23px !important;
  line-height: 23px !important;
}
/* 修改暂无数据样式 */
.base-table >>> .el-table__empty-text {
  line-height: 10px;
  margin-bottom: 15px;
  color: rgba(0, 0, 0, 0.25) !important;
  font-size: 14px;
}
.base-table >>> .empty_icon {
  width: 4em;
  height: 4em;
  display: block;
  margin: 0 auto;
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.table-title {
  float: left;
  margin-left: 5px;
  h4 {
    margin: 2px 30px 0px 0px;
    padding-left: 15px;
    border-left: 7px solid #007bff;
    font-weight: 500;
    font-size: 20px;
  }
}
.btn-bar {
  float: right;
  width: auto;
  text-align: right;
  & > div,
  button {
    float: right;
  }
}
</style>
