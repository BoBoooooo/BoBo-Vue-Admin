/*
 * @Author: BoBo
 * @Date: 2018-12-22 16:25:54
 * @Last Modified by:   BoBo
 * @Last Modified time: 2018-12-22 16:25:54
 */

/* eslint-disable no-new */
import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/icons/index' // icon
import '@/permission' // 权限import axios from 'axios';
import '@/styles/index.scss' // global css

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.axios = axios

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
