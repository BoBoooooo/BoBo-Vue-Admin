/*
 * @file: 通用请求crud
 * @copyright: BoBo
 * @author: BoBo
 * @Date: 2020年04月24 11:35:00
 */

import axios from '@/plugins/axios';

interface optionsType {
  url:string; // 请求地址
  method:string; // 请求方法 post / get
  data?:object; // body报体内容
  params?:object; // queryString内容
  headers?:any // 自定义头,用于设置是否加密请求
}

/**
 * 操作类型枚举
 */
export const DML = {
  INSERT: 'add',
  UPDATE: 'update',
  DELETE: 'delete',
  SELECT: 'list',
  TREE: 'tree',
  DETAIL: 'detail',
  DELETES: 'deleteByIds',
};

/**
 *
 * @param dml 操作类型
 * @param tableName 数据库表名
 * @param data body data
 * @param params query Params
 * @param encrypt 是否加密
 */
export function crud(dml:string, tableName:string, data:object = {}, params:any = null, encrypt:boolean = false) {
  const options:optionsType = {
    url: `/${tableName}/${dml}`,
    method: 'post',
  };
  // 以下请求通过包体传参
  if ('list,tree'.includes(dml)) {
    // 所有list接口后端使用实体类接收，需要保证结构
    options.data = {
      orderCondition: '',
      searchCondition: [],
      pageIndex: 0,
      pageSize: 0,
      ...data,
    };
    options.params = params;
  } else if ('add,update'.includes(dml) || dml === 'deleteByIds') {
    options.data = data;
  } else {
    // delete,tree两个请求在url传参
    options.params = data;
  }

  if (encrypt) {
    options.headers.encrypt = true;
  }
  return axios(options as any);
}
