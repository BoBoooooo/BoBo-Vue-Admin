/*
 * @Author: BoBo
 * @Date: 2018-12-21 14:35:39
 * @Description:
 * 前端路由，均为路由懒加载
 *
 * noDropDown 表示只渲染一级菜单，无下拉效果
 * hidden 隐藏指定路由，不渲染在菜单列表中
 * icon 配置父级菜单图标
 * noCache 不开启页面缓存
 *
 */
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'

Vue.use(Router)


export const constantRouterMap = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true,
},
{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true,
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  noDropdown: true,
  hidden: false,
  icon: 'dashboard',

  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    name: 'dashboard',
    meta: {
      title: 'Dashboard',
      icon: 'dashboard',
      noCache: true,
    },
  }],
},

]

export default new Router({
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRouterMap,
})

export const asyncRouterMap = [

  {
    path: '/SIX',
    component: Layout,
    redirect: '/SIX/Staff',
    name: 'SIX',
    title: '企业员工工资',
    icon: 'yonghuming',
    children: [{
      path: 'Staff',
      name: 'Staff',
      component: () => import('@/views/SIX/Staff'),
      meta: {
        title: '员工管理',
      },
    },
    {
      path: 'Salary',
      name: 'Salary',
      component: () => import('@/views/SIX/Salary'),
      meta: {
        title: '工资管理',
      },
    },
    {
      path: 'RewardOrPunish',
      name: 'RewardOrPunish',
      component: () => import('@/views/SIX/RewardOrPunish'),
      meta: {
        title: '奖惩管理',
      },
    },
    {
      path: 'Notice',
      name: 'Notice',
      component: () => import('@/views/SIX/Notice'),
      meta: {
        title: '系统公告',
      },
    },

    ],
  },
  {
    path: '/Archive',
    component: Layout,
    redirect: '/Archive/person_edit',
    name: 'Archive',
    title: '廉政档案',
    icon: 'yonghuming',
    children: [{
      path: 'person_edit',
      name: 'person_edit',
      component: () => import('@/views/Archive/person_edit'),
      meta: {
        title: '廉政档案编辑',
      },
    },
    {
      path: 'person_detail',
      name: 'person_detail',
      component: () => import('@/views/Archive/person_detail'),
      meta: {
        title: '廉政档案查看',
      },
    },
    {
      path: 'person_count',
      name: 'person_count',
      component: () => import('@/views/Archive/person_count'),
      meta: {
        title: '廉政档案统计',
      },
    },

    ],
  },
  {
    path: '/DouBan',
    component: Layout,
    redirect: '/DouBan/movie',
    name: 'DouBan',
    title: '豆瓣查询',
    icon: 'tubiao',
    children: [{
      path: 'movie',
      name: 'movie',
      component: () => import('@/views/DouBan/movie'),
      meta: {
        title: '热门电影',
      },
    },
    {
      path: 'music',
      name: 'music',
      component: () => import('@/views/DouBan/music'),
      meta: {
        title: '热门音乐',
      },
    },
    {
      path: 'book',
      name: 'book',
      component: () => import('@/views/DouBan/book'),
      meta: {
        title: '热门书籍',
      },
    },
    {
      path: 'zhihu',
      name: 'zhihu',
      component: () => import('@/views/DouBan/zhihu'),
      meta: {
        title: '知乎日报',
      },
    },

    ],
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/users',
    name: 'system',
    title: '系统设置',
    icon: 'zujian',
    noDropdown: false,
    hidden: false,
    children: [{
      path: 'users',
      name: 'users',
      component: () => import('@/views/system/users'),
      meta: {
        title: '用户设置',
      },
    },
    {
      path: 'dept',
      name: 'dept',
      component: () => import('@/views/system/dept'),
      meta: {
        title: '部门设置',
      },
    },
    {
      path: 'unit',
      name: 'unit',
      component: () => import('@/views/system/unit'),
      meta: {
        title: '单位设置',
      },
    },
    {
      path: 'role',
      name: 'role',
      component: () => import('@/views/system/role'),
      meta: {
        title: '角色设置',
      },
    },
    {
      path: 'formdesigner',
      name: 'formdesigner',
      component: () => import('@/views/system/formdesigner'),
      meta: {
        title: '表单设计',
      },
    },
    {
      path: 'dict',
      name: 'Dict',
      component: () => import('@/views/system/dict'),
      meta: {
        title: '数据字典',
      },
    },

    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]
