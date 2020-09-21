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
import App from './App.vue';// 下方$mount把App.vue挂载到public/index.html
import { router } from './router';// router内启用了懒加载
import 'normalize.css';// 重置css
import '@/plugins/element';// vue-cli3.0以插件形式引入elementui
import '@/permission'; // 权限控制
import '@/styles/index.scss'; // 全局样式
import '@/icons/autoImportSvg'; // 自动导入src/icon目录下的svg图标

const app = createApp(App).use(store).use(router);

app.use(animated);

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
