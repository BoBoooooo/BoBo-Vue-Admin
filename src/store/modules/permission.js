import {
  asyncRouterMap,
  constantRouterMap,
} from '@/router/index'

/**
 * 判断是否有路由权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.name) {
    return roles.some(role => route.name.includes(role))
  }
  return true
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(_asyncRouterMap, roleauthname) {
  const accessedRouters = _asyncRouterMap.filter((route) => {
    if (hasPermission(roleauthname, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roleauthname)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
  },
  actions: {
    GenerateRoutes({
      commit,
    }, data) {
      return new Promise((resolve) => {
        const {
          roleauthname,
        } = data
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roleauthname)

        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    },
  },
}

export default permission
