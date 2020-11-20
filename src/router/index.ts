/**
 * @file 主路由，默认全部使用懒加载，原理：
 *       https://router.vuejs.org/zh/guide/advanced/lazy-loading.html
 *       路由表中属性的作用：
 *       hidden: true 在侧边栏隐藏该菜单
 *       redirect: noredirect 不重定向
 *       name: 路由名称，必须设置，用于<keep-alive>
 *       title: 在菜单栏和面包屑上显示的标题
 *       icon: svgIcon icon-class名称等于菜单名称,详见icons/svg/menu
 *       noCache: true 不缓存页面，默认缓存
 * @copyright NanJing Anshare Tech .Com
 * @author BoBo
 * @updateDate 2020年06月17日11:23:04
 */
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Layout from '../views/layout/Layout.vue';

Vue.use(VueRouter);

// 用于多级菜单时候作为router-view入口用
const RouteView = () => ({ render: h => h('router-view') });

// 固定路由表
export const constantRouterMap:RouteConfig[] = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/views/layout/Layout.vue'),
    meta: { hidden: true },
    name: 'dashboard',
  },
  { path: '/login', component: () => import('@/views/public/Login.vue'), meta: { hidden: true } },
  {
    path: '/404', name: 'notFound', component: () => import('@/views/public/404.vue'), meta: { hidden: true },
  },
];

export const router = new VueRouter({
  routes: constantRouterMap,
});


// 异步路由
const asyncRouter:RouteConfig[] = [
  {
    path: '/dashboard',
    component: Layout,
    name: 'dashboardForUser',
    meta: {
      title: '首页',
    },
    redirect: '/dashboard/dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/Dashboard.vue'),
      name: 'dashboardForUserIndex',
      meta: {
        title: '首页',
      },
    }],
  },
  {
    path: '/system',
    component: Layout,
    name: 'System',
    meta: {
      title: '系统管理',
    },
    children: [
      {
        path: 'users',
        name: 'Users',
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/Users.vue'),
        meta: { title: '用户管理' },
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/Role.vue'),
        meta: { title: '角色管理' },
      },
      {
        path: 'dept',
        name: 'Dept',
        component: () => import(/* webpackChunkName: "system" */ '@/views/system/Dept.vue'),
        meta: { title: '部门管理' },
      },
    ],
  },
  {
    path: '/dev-tools',
    component: Layout,
    name: 'DevTools',
    meta: {
      title: '开发人员工具',
    },
    children: [
      {
        path: 'form-designer',
        name: 'FormDesigner',
        component: () => import(/* webpackChunkName: "dev" */ '@/views/devTools/FormDesigner.vue'),
        meta: { title: '表单设计' },
      },
      {
        path: 'table-designer',
        name: 'TableDesigner',
        component: () => import(/* webpackChunkName: "dev" */ '@/views/devTools/TableDesigner.vue'),
        meta: { title: '表格设计' },
      },
      {
        path: 'dict',
        name: 'Dict',
        component: () => import(/* webpackChunkName: "dev" */ '@/views/devTools/Dict.vue'),
        meta: { title: '字典管理' },
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true },
  },

];

export const asyncRouterMap = asyncRouter;
