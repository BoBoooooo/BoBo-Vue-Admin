import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
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
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    noDropdown:true,
    hidden:true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  },
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
 

  {
    path: '/DouBan',
    component: Layout,
    redirect: '/DouBan/movie',
    name:"DouBan",
    title:"豆瓣查询" ,
    icon:'tubiao',
    children: [{ path: 'movie', name: 'movie', component: _import('DouBan/movie'),meta:{title:"热映电影"}},
    { path: 'music', name: 'music', component: _import('DouBan/music'),meta:{title:"热门音乐"}},
    { path: 'book', name: 'book', component: _import('DouBan/book'),meta:{title:"热门书籍"}}]
  },
  {
    path: '/KaoQin',
    component: Layout,
    redirect: '/KaoQin/person',
    name:"person",
    title:"人员信息",
    icon:'zonghe',
    children: [{ path: 'person', name: 'person', component: _import('KaoQin/person'),meta:{title:"人员信息录入"}}]
  },
  {
    path: '/KaoQin',
    component: Layout,
    redirect: '/KaoQin/import',
    name:"KaoQin",
    title:"考勤管理" ,
    icon:'zonghe',
    children: [{ path: 'import', name: 'import', component: _import('KaoQin/import'), meta:{title:"考勤信息录入"}},
    { path: 'count', name: 'count', component: _import('KaoQin/count'), meta:{title:"考勤信息汇总"}}]
  },
  // {
  //   path: '/table',
  //   component: Layout,
  //   redirect: '/table/index',
  //   noDropdown:true,
  //   title:"Table",
  //   icon:'zonghe',
  //   children: [{ path: 'import', name: 'table1', component: _import('table/index'), meta:{title:"EasyMock"}}]
  // },
  
  {
    path: '/system',
    component: Layout,
    redirect: 'noredirect',
    name: 'system',
    title:"系统设置",
    icon:'zujian',
    children: [
      { path: 'users', name: 'users', icon: 'icons', component: _import('system/users'),meta:{title:"用户设置"}},
      
      { path: 'role', name: 'role', icon: 'icons', component: _import('system/role'),meta:{title:"角色设置"}},
      { path: 'dept', name: 'dept', icon: 'icons', component: _import('system/dept'),meta:{title:"部门设置"}}

      
    ]
  },


  { path: '*', redirect: '/404', hidden: true }
]
