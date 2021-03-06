/**
 * @file webpack入口文件，主要作用是初始化vue实例并挂载插件
 *       vue-cli3约定大于配置，@vue/cli-service默认读取本文件配置传递给webpack
 * @author BoBo
 * @copyright BoBo
 * @createDate 2018年11月13日10:56:55
 */
import Vue from 'vue';
import lodash from 'lodash';
import dayjs from 'dayjs';
import axios from '@/plugins/axios'; // axios中统一设置Token
import store from '@/store/index'; // store内做了局部持久化
import App from './App.vue'; // 下方$mount把App.vue挂载到public/index.html
import { router } from './router'; // router内启用了懒加载
import 'normalize.css'; // 重置css
import '@/plugins/element-pro-crud'; // 引入element-pro-crud
import '@/plugins/element'; // vue-cli3.0以插件形式引入elementui
import '@/permission'; // 权限控制
import '@/styles/index.scss'; // 全局样式
import '@/icons/autoImportSvg'; // 自动导入src/icon目录下的svg图标

/* 这里改写原型链，将axios设置为Vue的原型属性，
之后可以在组件的methods中使用this.axios发起请求。
就算改写了原型链也无法在store中访问axios，
必须在store中再次引入axios */
Vue.prototype.axios = axios;
// 改写原型链以全局支持this.lodash
Vue.prototype.lodash = lodash;
// 全局注册dayjs
Vue.prototype.dayjs = dayjs;
// 阻止vue在启动时生成生产提示
Vue.config.productionTip = false;
// 注入全局HOST_URL地址
Vue.prototype.HOST_URL = window.__HOST__URL__;
Vue.prototype.API_URL = window.__HOST__URL__ + window.__PREFIX__URL__;
Vue.prototype.CHAT_URL = window.__CHAT__URL__;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
