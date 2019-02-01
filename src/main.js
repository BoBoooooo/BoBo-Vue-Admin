/*
 * @Author: BoBo
 * @Date: 2018-12-22 16:25:54
 * @Last Modified by:   BoBo
 * @Last Modified time: 2018-12-22 16:25:54
 * @Description
 * 入口文件，初始化了全局Vue实例
 * 全局插件以及组件的注册需写在main.js中
 */

/* eslint-disable no-new */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import fetch from './utils/fetch'
import router from './router'
import store from './store'
import '@/icons/index' // icon
import '@/permission' // 权限import axios from 'axios';
import '@/styles/index.scss' // global css
import CrudTable from '@/components/CrudTable';

Vue.use(ElementUI)
Vue.component('crud-table', CrudTable) // 注册全局增删改查table组件
Vue.config.productionTip = false
Vue.prototype.axios = fetch // 全局基于拦截器配置后的ajax  拦截器在 utils/fetch
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
