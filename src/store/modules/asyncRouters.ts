/**
 * @file 动态路由数据
 * @author BoBo
 * @copyright BoBo
 * @createDate 2018年11月13日20:30:41
 */

import { asyncRouterMap, constantRouterMap } from '@/router/index';

/**
 * 判断是否有路由权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.name) {
    return roles.some(role => route.name === role);
  }
  return true;
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap 异步路由表
 * @param roles 当前登录用户的角色
 */
function filterAsyncRouter(routerMap, roles) {
  const accessedRouters = routerMap.filter((route) => {
    // 如果父级菜单有访问权限
    if (hasPermission(roles, route)) {
      // 下级菜单鉴权
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    menuNum: {},

  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    },
    SET_MENUNUM: (state, menuNum) => {
      state.menuNum = menuNum;
    },
  },
  actions: {
    // 根据角色名称设置路由
    generateRoutes({ commit }, args) {
      // 当前用户有权限的路由，当前用户登录名
      const { roleRouters, userName } = args;
      return new Promise((resolve) => {
        // 管理员可查看所有页面
        if (userName === 'admin') {
          commit('SET_ROUTERS', asyncRouterMap);
        } else {
          const accessedRouters = filterAsyncRouter(asyncRouterMap, roleRouters);
          commit('SET_ROUTERS', accessedRouters);
        }
        resolve();
      });
    },
  },
};

export default permission;
