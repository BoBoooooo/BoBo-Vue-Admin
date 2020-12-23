/**
 * @file vuex.vuejs.org/zh
 * @author BoBo
 * @copyright BoBo
 * @createDate 2018年11月13日18:09:59
 */
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import app from './modules/app';
import user from './modules/user';
import tagsView from './modules/tagsView';
import asyncRouters from './modules/asyncRouters';
import webSocket from './modules/webSocket';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  // 注意：新增的modules如果需要持久化还需要在plugins配置一下
  modules: {
    app,
    user,
    asyncRouters,
    tagsView,
    webSocket,
  },
  getters,
  // 局部持久化，之所以不能全部持久化，详见src/permission.js
  plugins: [createPersistedState({ paths: ['tagsView'] })],
});

export default store;
