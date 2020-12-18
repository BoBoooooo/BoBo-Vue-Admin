/*
 * @file: 导入element-ui
 * @copyright: BoBo
 * @author: BoBo
 * @Date: 2020年09月24 14:00:34
 */

/* eslint-disable */
import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';// 白垩主题，此文件在node_modules下的elementui包内
import '@/styles/element-ui-override.scss';// 客制化elementui，我自己创建的
import '@/styles/element-variables.scss'; // 自定义element ui主题颜色

Vue.use(Element);
