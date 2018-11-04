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
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

  export  const asyncRouterMap = [
    {
      path: '/Archive',
      component: Layout,
      redirect: '/Archive/person_edit',
      name:"Archive",
      title:"廉政档案",
      icon:'yonghuming',
      children: [
        { path: 'person_edit', name: 'person_edit',title:"档案编辑", component: ()=>import('@/views/Archive/person_edit'),meta:{title:"廉政档案编辑"}},
        { path: 'person_detail', name: 'person_detail',title:"档案查看", component: ()=>import('@/views/Archive/person_detail'),meta:{title:"廉政档案查看"}},
        { path: 'person_count', name: 'person_count',title:"数据统计", component: ()=>import('@/views/Archive/person_count'),meta:{title:"廉政档案统计"}}

      ]
    },
    {
      path: '/DouBan',
      component: Layout,
      redirect: '/DouBan/movie',
      name:"DouBan",
      title:"豆瓣查询",
      icon:'tubiao',
      children: [
        { path: 'movie', name: 'movie',title:"热门电影", component: ()=>import('@/views/DouBan/movie'),meta:{title:"热门电影"}},
        { path: 'music', name: 'music',title:"热门音乐", component: ()=>import('@/views/DouBan/music'),meta:{title:"热门音乐"}},
        { path: 'book', name: 'book',title:"热门书籍", component: ()=>import('@/views/DouBan/book'),meta:{title:"热门书籍"}}

      ]
    },

    {
      path: '/system',
      component: Layout,
      redirect: '/system/users',
      name:"system",
      title:"系统设置",
      icon:'zujian',
      children: [
        { path: 'users', name: 'users',title:"用户设置", component: ()=>import('@/views/system/users'),meta:{title:"用户设置"}},
        { path: 'dept', name: 'dept',title:"部门设置", component: ()=>import('@/views/system/dept'),meta:{title:"部门设置"}},
        { path: 'role', name: 'role',title:"角色设置", component: ()=>import('@/views/system/role'),meta:{title:"角色设置"}},
        { path: 'formdesigner', name: 'formdesigner',title:"表单设计", component: ()=>import('@/views/system/formdesigner'),meta:{title:"表单设计"}},

      ]
    },

    

    {path:"*",redirect:"/404",hidden:true}
  ]


 
 