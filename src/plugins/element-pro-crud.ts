/*
 * @file: pro crud 组件注册
 * @author: BoBo
 * @copyright: BoBo
 * @Date: 2020-12-08 14:31:55
 */
import Vue from 'vue';
import ElementProCrud from 'element-pro-crud';
import 'element-pro-crud/lib/ProCrud.css'; // 此处css引入需要放到element-ui css引入之前,避免样式覆盖问题
import { crud } from '@/api/public/crud';
import * as pluginsApi from '@/api/system/form';

const $PROCRUD_OPTION = {
  ...pluginsApi,
  crud,
};
// 通过cdn挂载插件时无法传入指定options,直接挂在原型链
if (process.env.VUE_APP_CDN === 'true') {
  Vue.prototype.$PROCRUD = $PROCRUD_OPTION;
} else {
  Vue.use(ElementProCrud, $PROCRUD_OPTION);
}
