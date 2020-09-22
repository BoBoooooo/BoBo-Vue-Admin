/**
 * @file webpack入口文件，主要作用是初始化vue实例并挂载插件
 *       vue-cli3约定大于配置，@vue/cli-service默认读取本文件配置传递给webpack
 * @author BoBo
 * @copyright NanJing Anshare Tech .Com
 * @createDate 2018年11月13日10:56:55
 */
import { createApp } from 'vue';

import lodash from 'lodash';
import PinyinMatch from 'pinyin-match';// 拼音匹配
import dayjs from 'dayjs';
import animated from 'animate.css';
import CrudTable from '@/components/CrudTable/CrudTable.vue'; // 全局注册用于增删改查的高级表格组件
import axios from '@/plugins/axios';// axios中统一设置Token
import store from '@/store/index';// store内做了局部持久化
import Element from 'element-plus';
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
import App from './App.vue';// 下方$mount把App.vue挂载到public/index.html
import { router } from './router';// router内启用了懒加载
import 'normalize.css';// 重置css
import '@/permission'; // 权限控制
import '@/styles/index.scss'; // 全局样式
import 'element-plus/lib/theme-chalk/index.css';// 白垩主题，此文件在node_modules下的elementui包内
import '@/styles/element-ui-override.scss';// 客制化elementui，我自己创建的
import '@/styles/element-variables.scss'; // 自定义element ui主题颜色

// 全局注册SvgIcon组件

const requireAll = (requireContext) => requireContext.keys().map(requireContext);
// 到同级svg目录下（不包含子目录）找所有文件名以.svg结尾且能被require的文件
// require.context有三个参数：
// - directory：说明需要检索的目录
// - useSubdirectories：是否检索子目录
// - regExp: 匹配文件的正则表达式
const req = require.context('@/icons/svg', true, /\.svg$/);
requireAll(req);

const app = createApp(App).use(Element).use(animated).use(store)
  .use(router);
app.component('SvgIcon', SvgIcon);

app.component('CrudTable', CrudTable); // 全局注册用于增删改查的高级表格组件

/* 全局引入axios */
app.config.globalProperties.axios = axios;
/* 全局引入lodash */
app.config.globalProperties.lodash = lodash;
/* 全局引入dayjs */
app.config.globalProperties.dayjs = dayjs;
/* 拼音匹配插件 */
app.config.globalProperties.$pinyinmatch = PinyinMatch;
// // 挂载EventBus
app.config.globalProperties.$EventBus = createApp(App);
app.mount('#app');
