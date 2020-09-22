/*
 * @file: curd Props
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019-07-09 14:30:43
 */
const props = {
  // 表格行中的添加按钮点击事件
  btnRowAddOnClick: {
    type: Function,
    // 默认必须为null用于后期判断是否传入
    default: null,
  },
  // 展开行
  expandRowKeys: Array,
  // response中数据位置
  listField: {
    type: String,
    default: 'data.list',
  },
  // 表单禁用
  setReadOnly: {
    type: Object,
    default: null,
  },
  // 是否需要多选
  isMultiple: {
    type: Boolean,
    default: false,
  },
  emptyText: String,
  // 添加对话框预填项
  prefill: {
    type: Object,
    default: null,
  },
  dialogAppendToBody: {
    type: Boolean,
    default: false,
  },
  // 用于请求表格设计json的name
  tableDesignerName: {
    type: String,
    default: null,
  },
  // 对话框内加载FormDesigner的表名
  dialogFormDesignerName: {
    type: String,
    default: null,
  },
  // 排序条件
  orderCondition: {
    type: String,
    default: null,
  },
  // 表格字段
  columns: {
    type: Array,
    default: () => [],
  },
  // 查询表单生成条件
  searchFormCondition: {
    type: Array,
    default: () => [],
  },
  // 内部元素显示控制
  visibleList: {
    type: Object,
    default: () => ({}),
  },
  // 内部元素禁用控制
  disableList: {
    type: Object,
    default: () => ({}),
  },
  // 表名
  tableName: {
    type: String,
    default: '',
  },
  // 表格标题
  tableTitle: {
    type: String,
    default: '',
  },
  // 表格参数
  tableParams: {
    type: [Object, Array],
    default: () => ({}),
  },
  // 多表关联条件
  multiTableParams: {
    type: String,
    default: '',
  },
  expandModel: {
    type: Object,
  },
  // 对话框标题
  textMap: {
    type: Object,
    default: () => ({}),
  },
  // 点击删除按钮的promise
  promiseForDel: {
    type: Function,
    // 默认必须为null用于后期判断是否传入
    default: null,
  },
  // 覆盖查询的promise
  promiseForSelect: {
    type: Function,
    // 默认必须为null用于后期判断是否传入
    default: null,
  },
  // 查看按钮是否显示
  btnDetailVisibleFunc: {
    type: Function,
    // 默认必须为null用于后期判断是否传入
    default: null,
  },
  // 编辑按钮是否显示
  btnEditVisibleFunc: {
    type: Function,
    // 默认必须为null用于后期判断是否传入
    default: null,
  },
  // 删除按钮是否显示
  btnDelVisibleFunc: {
    type: Function,
    // 默认必须为null用于后期判断是否传入
    default: null,
  },
  // 添加按钮点击事件
  btnAddOnClick: {
    type: Function,
    // 默认必须为null用于后期判断是否传入
    default: null,
  },
  // 编辑按钮点击事件
  btnEditOnClick: {
    type: Function,
    // 默认必须为null用于后期判断是否传入
    default: null,
  },
  // 查看按钮点击事件
  btnDetailOnClick: {
    type: Function,
    // 默认必须为null用于后期判断是否传入
    default: null,
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
  // 远程数据方法
  remoteFuncs: {
    type: Object,
    default: () => ({}),
  },
  // 行的 className 的回调方法
  rowClassName: {
    type: [String, Function],
    default: null,
  },
  // 表格选中行的id
  multipleExportField: {
    type: String,
    default: null,
  },
  // 用于一页显示所有数据
  pageSizes: {
    type: Array,
    default: () => [10, 50, 100],
  },
  // 分页显示方式
  paginationLayout: {
    type: String,
    default: 'total, prev, pager, next, jumper, sizes',
  },
  maxHeightMinus: {
    type: Number,
    default: 270,
  },
  fullHeight: {
    type: Boolean,
    default: false,
  },
  // 选择框动态判断是否显示
  selectableFunc: {
    type: Function,
    default: null,
  },
  // 点击阴影弹框是否可以关闭
  dialogCloseOnClickModal: {
    type: Boolean,
    default: true,
  },
  // 表单是否全屏
  dialogFullscreen: {
    type: Boolean,
    default: false,
  },
  // 是否显示序号列
  showColumnIndex: {
    type: Boolean,
    default: false,
  },
  // 自定义导出downloadUrl
  exportDownloadUrl: {
    type: String,
    default: null,
  },
  // 是否显示查询条件
  showOperator: {
    type: Boolean,
    default: false,
  },
  border: {
    type: Boolean,
    default: true,
  },
  // 异步更新表单数据
  formValuesAsync: {
    type: Object,
    default: () => ({}),
  },
  // 子表tableConfig 详情看GenerateFormItem中解释
  formTableConfig: {
    type: Object,
    default: () => ({}),
  },
  // 是否开启行内编辑模式
  editInlineMode: {
    type: Boolean,
    default: false,
  },
  // 行样式
  rowStyle: {
    type: Function,
    default: () => ({
      height: '20px',
    }),
  },
  cellStyle: {
    type: Function,
    default: () => ({
      padding: '5px',
    }),
  },
  // 斑马纹
  stripe: {
    type: Boolean,
    default: true,
  },
  // 操作列表头放添加按钮
  btnAddOnColumnHeader: {
    type: Boolean,
    default: false,
  },
  actionColumnWidth: {
    type: Number,
    default: null,
  },
  // 表格大小
  size: String,
  fit: {
    type: Boolean,
    default: true,
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  highlightCurrentRow: Boolean,

  currentRowKey: [String, Number],
  rowKey: [String, Function],
  defaultExpandAll: Boolean,
  defaultSort: Object,
  tooltipEffect: String,
  showSummary: Boolean,
  sumText: String,
  summaryMethod: Function,
  // custom attributes
  tableStyle: {
    type: String,
    default: 'width:100%;',
  },
  totalField: {
    type: String,
    default: 'data.total',
  },
  // pageIndexKey
  pageIndexKey: { default: 'pageIndex', type: String },
  pageSizeKey: { default: 'pageSize', type: String },
};
export default props;
