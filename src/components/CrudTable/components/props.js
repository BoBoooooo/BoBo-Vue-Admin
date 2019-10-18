/*
 * @file: CrudTable属性
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019-03-21 14:37:23
 */

export default {

  tableName: String,
  showPagination: {
    type: Boolean,
    default: true,
  },
  handleButton: {
    type: String,
    default: '',
  },
  IsMultiple: {
    type: Boolean,
    default: false,
  },
  toolbarButton: {
    type: String,
    default: 'clear,search',
  },
  tableParams: {
    type: Object,
    default: () => ({}),
  },
  // 当前表单实体model
  entity: {
    type: Object,
    default: () => ({}),
  },
  // 表单预设值
  formDefaultValue: {
    type: Object,
    default: () => ({}),
  },
  remoteFunctions: {
    type: Object,
    default: () => ({}),
  },
  // 表单元素只读控制
  setReadOnly: {
    type: Object,
    default: null,
  },
  // 表单元素隐藏控制
  setHidden: {
    type: Array,
    default: () => ([]),
  },
  // 代理table请求方法
  customForFetchData: {
    type: Function,
    default: null,
  },
  // 表格设计json
  tableDesignerName: {
    type: String,
    default: null,
  },
  // Dialog内表单设计json
  dialogFormDesignerName: {
    type: String,
    default: null,
  },
  tableList: {
    type: Array,
    default: () => [],
  },
  showColumnIndex: {
    type: Boolean,
    default: false,
  },
};
