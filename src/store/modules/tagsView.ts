/**
 * @file 顶部标签页切换组件数据
 * @author BoBo
 * @copyright BoBo
 * @createDate 2018年11月13日20:28:55
 */
import forEach from 'lodash/forEach';
import { router, asyncRouterMap } from '@/router/index';

const tagsView = {
  state: {
    // 用户访问过的页面，是标签栏导航显示的一个个tag数组集合
    visitedViews: [],
    // 实际 keep-alive 的路由。可以在配置路由的时候通过 meta.noCache 来设置是否需要缓存这个路由 默认都缓存
    cachedViews: [],
  },
  mutations: {
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some((v) => v.path === view.path)) return;
      state.visitedViews.push({
        name: view.name,
        path: view.path,
        title: view.meta.title || 'no-name',
      });
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name);
      }
    },
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          break;
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews.splice(index, 1);
          break;
        }
      }
    },
    DEL_OTHERS_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews = state.visitedViews.slice(i, i + 1);
          break;
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews = state.cachedViews.slice(index, i + 1);
          break;
        }
      }
    },
    DEL_ALL_VIEWS: (state) => {
      state.visitedViews = [];
      state.cachedViews = [];
    },
  },
  actions: {
    // 打开新标签页
    openNewTab({ dispatch }, routerObj) {
      // 根据传入的name查找包含path的对象
      let view: any = null;
      const { name, queryJsonString } = routerObj;
      forEach(asyncRouterMap as any, (l1) => {
        forEach(l1.children, (l2) => {
          if (l2.name === name) {
            view = {
              path: `${l1.path}/${l2.path}`,
              name,
            };
            return false;
          }
          return true;
        });
        return !view;
      });
      // 删除已有tab
      dispatch('delVisitedViews', view).then(() => {
        // 等待keep-alive:include响应cachedViews变化后再开页面
        // 路由跳转支持传参
        setTimeout(() => {
          const next: any = { name: view.name };
          if (queryJsonString) {
            const queryJson = JSON.parse(queryJsonString);
            next.params = queryJson;
          }
          router.push(next);
        }, 10);
      });
    },
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view);
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view);
        resolve([...state.visitedViews]);
      });
    },
    delOthersViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VIEWS', view);
        resolve([...state.visitedViews]);
      });
    },
    delAllViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS');
        resolve([...state.visitedViews]);
      });
    },
  },
};

export default tagsView;
