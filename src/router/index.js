import Vue from 'vue'
import Router from 'vue-router'
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/
export const constantRouterMap = [
  { path: '/login', component: ()=>import('@/views/login/index'), hidden: true },
  { path: '/404', component: ()=>import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    noDropdown:true,
    hidden:true,
    children: [{
      path: 'dashboard',
      component: ()=>import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  }

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})



  export  const asyncRouterMap_Map = {
    "movie": ()=>import('@/views/DouBan/movie'),
  "music": ()=>import('@/views/DouBan/music'),
   "book": ()=>import('@/views/DouBan/book'),
   "users": ()=>import('@/views/system/users'),
     
   "role": ()=>import('@/views/system/role'),
    "dept": ()=>import('@/views/system/dept')
 }
  // {
  //   path: '/People',
  //   component: Layout,
  //   redirect: '/People/person',
  //   name:"person",
  //   title:"人员信息",
  //   icon:'wujiaoxing',
  //   children: [{ path: 'person', name: 'person1',title:"人员信息录入", component: ()=>import('@/views/KaoQin/person'),meta:{title:"人员信息录入"}}]
  // },

