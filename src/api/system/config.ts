/*
 * @file: 请求系统配置
 * @copyright: BoBo
 * @author: BoBo
 * @Date: 2020年07月22 09:25:04
 */

import { crud, DML } from '@/api/public/crud';

export default function () {
  return crud(DML.SELECT, 'ad_codelist', {
    searchCondition: [{ field: 'codeType', operator: 'eq', value: '系统配置' }],
  });
}
