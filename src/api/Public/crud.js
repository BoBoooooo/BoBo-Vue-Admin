/*
 * @file: 封装常规crud
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019-03-19 15:07:59
 */
import axios from '@/utils/fetch';

export default function (dml, tableName, data, params) {
  const options = {
    // url: `/${tableName.replace(/_/g, '/')}/${dml}`,
    url: `/${tableName}/${dml}`,

    method: 'post',
  };
  // 以下请求通过包体传参
  if ('list'.includes(dml)) {
    // 所有list接口后端使用实体类接收，需要保证结构
    options.data = {
      totalCount: null,
      pageSize: 0,
      pageNumber: 0,
      searchArr: [
        {
          SearchKey: '',
          SearchValue: '',
          SearchOperator: '',
        },
      ],
      ...data,
    };
    options.params = params;
  } else if ('add,update'.includes(dml)) {
    options.data = data;
  } else {
    // delete,tree两个请求在url传参
    options.params = data;
  }
  return axios(options);
}
