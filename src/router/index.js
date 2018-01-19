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
    meta: { role: ['user','system'],title:"豆瓣查询" ,icon:'tubiao',father:true},
    children: [{ path: 'movie', name: 'movie', component: _import('DouBan/movie'), meta: { role: ['user','system'],title:"热门电影" }},
    { path: 'music', name: 'music', component: _import('DouBan/music'), meta: { role: ['user','system'] ,title:"音乐排行"}},
    { path: 'book', name: 'book', component: _import('DouBan/book'), meta: { role: ['user','system'] ,title:"热门图书"}}]
  },
  {
    path: '/KaoQin',
    component: Layout,
    redirect: '/KaoQin/person',
    name:"人员信息",
    meta: { role: ['user','system'],title:"人员信息" ,icon:'zonghe',father:true},
    children: [{ path: 'person', name: 'person', component: _import('KaoQin/person'), meta: { role: ['user','system']  ,title:"人员信息录入"}}]
  },
  {
    path: '/KaoQin',
    component: Layout,
    redirect: '/KaoQin/import',
    name:"KaoQin",
    meta: { role: ['user','system'],title:"考勤管理" ,icon:'zonghe',father:true},
    children: [{ path: 'import', name: 'import', component: _import('KaoQin/import'), meta: { role: ['user','system']  ,title:"考勤信息录入"}},
    { path: 'count', name: 'count', component: _import('KaoQin/count'), meta: { role: ['user','system']  ,title:"考勤信息汇总"}}]
  },
  {
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    noDropdown:true,
    meta: { role: ['user','system'],title:"Table" ,icon:'zonghe',father:true},
    meta: { role: ['user','system'],title:"table" ,icon:'zonghe'},
    children: [{ path: 'import', name: 'table1', component: _import('table/index'), meta: { role: ['user','system']  ,title:"EasyMock"}}]
  },
  
  {
    path: '/system',
    component: Layout,
    redirect: 'noredirect',
    name: 'system',
    meta: { role: ['system'],title:"系统设置",icon:'zujian',father:true},
    children: [
      { path: 'users', name: 'users', icon: 'icons', component: _import('system/users'),meta: { role: ['system'],title:"用户设置" }},
      
      { path: 'role', name: 'role', icon: 'icons', component: _import('system/role'),meta: { role: ['system'] ,title:"角色设置"}},
      { path: 'dept', name: 'dept', icon: 'icons', component: _import('system/dept'),meta: { role: ['system'],title:"部门设置" }},

      
    ]
  },


  { path: '*', redirect: '/404', hidden: true }
]
