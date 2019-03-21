/*
 * @file: CrudTable属性
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019-03-21 14:37:23
 */

export default {
  disabled: {
    type: Boolean,
    default: false,
  },
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
  asyncCondition: {
    type: Object,
    default: () => ({}),
  },
  // 当前表单实体model
  entity: {
    type: Object,
    default: () => ({}),
  },
};
