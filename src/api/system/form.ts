import axios from '@/plugins/axios';

/**
 * 获取数据库中所有表名
 *
 * @returns 所有表名
 */
export function getTables() {
  return axios({
    url: '/form/getTables',
    method: 'post',
  });
}

/**
 * 根据表名获取表格的设计json等信息
 *
 * @param {String} tablename
 * @returns 表格设计json
 */
export function getTableDetail(tablename) {
  return axios({
    url: '/dynamictables/detail',
    method: 'post',
    params: { tablename },
  });
}

export function getFormDetail(tablename) {
  return axios({
    url: '/form/detail',
    method: 'post',
    params: { tablename },
  });
}

/**
 *
 * @param {String} tablename
 */
export function getFormKey(tablename) {
  return axios({
    url: '/form/getKey',
    method: 'post',
    params: { tablename },
  });
}
