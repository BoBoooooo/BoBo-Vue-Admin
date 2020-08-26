/**
 * 用于存放一些常用的类定义和常量
 */

/**
 * 高级查询相关类
 */
// 高级查询单个查询条件
export class Condition {
  field: string;

  operator: string;

  value: any;

  /**
   *
   * @param {String} field 查询条件的名称
   * @param {String} operator 操作符 列：eq,neq
   * @param {Any} value 查询条件的值
   */
  constructor(field, operator, value) {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }
}
// 高级查询
export class SearchModel {
  orderCondition: string;

  pageIndex: number;

  pageSize: number;

  searchCondition: any[];

  /**
   * 查询类
   * @param {String} orderCondition 排序条件
   * @param {Number} pageIndex 分页页码 //pageIndex:0,pageSize:0代表不分页
   * @param {Number} pageSize 分页单页元素数量
   * @param {Array} searchCondition 查询条件数组
   */
  constructor(orderCondition = '', pageIndex = 0, pageSize = 0, searchCondition = []) {
    this.orderCondition = orderCondition;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.searchCondition = searchCondition;
  }
}

// 弹窗的状态
export const STATUS = {
  CREATE: 0,
  UPDATE: 1,
  DETAIL: 2,
};
// 秘密等级
export const SecretLevels = [
  {
    level: '0',
    label: '未定密',
  },
  {
    level: '1',
    label: '秘密',
  },
  {
    level: '2',
    label: '机密',
  },
];
// 文件打开模式枚举
export const MODE_ENUM = {
  EDIT: 'edit', // 编辑
  READ: 'readonly', // 只读
};

// 过value为 "" ,null,undefined 的condition
const empty = ['', undefined, null];
const operators = ['like'];
export const filterEmpty = searchCondition => searchCondition.filter(({ operator, value }) => !(empty.includes(value) && operators.includes(operator)));
