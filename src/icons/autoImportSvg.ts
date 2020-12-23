/**
 * @file 自动导入src/icon目录下的svg图标，在main.js中加载
 * @author BoBo
 * @copyright BoBo
 * @createDate 2018年11月13日16:58:18
 */
import Vue from 'vue';
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';

// 全局注册SvgIcon组件
Vue.component('SvgIcon', SvgIcon);

const requireAll = requireContext => requireContext.keys().map(requireContext);
// 到同级svg目录下（不包含子目录）找所有文件名以.svg结尾且能被require的文件
// require.context有三个参数：
// - directory：说明需要检索的目录
// - useSubdirectories：是否检索子目录
// - regExp: 匹配文件的正则表达式
const req = require.context('./svg', true, /\.svg$/);
requireAll(req);
