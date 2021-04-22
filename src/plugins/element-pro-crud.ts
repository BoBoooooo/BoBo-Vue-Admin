/*
 * @file: pro crud 组件注册
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2020-12-08 14:31:55
 */
import Vue from 'vue';
import { crud } from '@/api/public/crud';
import * as pluginsApi from '@/api/system/form';
// 按需引入
// import { ProForm, ProTable, CrudTable, TableDesigner, FormDesigner } from 'element-pro-crud';

// 全量引入
import ElementProCrud from 'element-pro-crud';
import 'element-pro-crud/lib/css/pro-crud.css';

const $PROCRUD_OPTION = {
  ...pluginsApi,
  crud,
};
// 通过cdn挂载插件时无法传入指定options,直接挂在原型链
if (process.env.VUE_APP_CDN === 'true') {
  Vue.prototype.$PROCRUD = $PROCRUD_OPTION;
} else {
  Vue.use(ElementProCrud, $PROCRUD_OPTION);
  // 按需引入
  // Vue.use(FormDesigner, $PROCRUD_OPTION);
  // Vue.use(ProForm, $PROCRUD_OPTION);
  // Vue.use(ProTable, $PROCRUD_OPTION);
  // Vue.use(CrudTable, $PROCRUD_OPTION);
  // Vue.use(TableDesigner, $PROCRUD_OPTION);
}

// VueTreeselect为cdn引入 需要注册成全局组件
Vue.component('treeselect', window.VueTreeselect.Treeselect);
