import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import locale from 'element-ui/lib/locale/lang/en'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限import axios from 'axios';
import axios from 'axios'
import $ from 'jquery'
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
