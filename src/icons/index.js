/*
 * @Author: BoBo
 * @Date: 2018-12-25 18:33:50
 * @Description: 全局注册svg-icon组件
 */
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue';

// register globally
Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
