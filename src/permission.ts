/**
 * @file 全局请求权限控制，本文件在main.js中引用
 * @author BoBo
 * @copyright NanJing Anshare Tech .Com
 * @createDate 2018年11月13日10:58:43
 */

import dayjs from 'dayjs';
import Watermark from '@/plugins/watermark';
import { router } from './router';
import store from './store';
// 白名单：不需要鉴权的地址
const whiteList = ['/login'];

// 路由全局前置守卫
router.beforeEach(async (to, from, next) => {
  if (store.getters.token != null && store.getters.token !== 'null') {
    if (to.path === '/login') {
      next({
        path: '/',
      });
    } else if (store.getters.addRouters.length === 0) {
      // 如果addRouters长度为0说明permission.js中没有追加有权限的路由表
      // 请求用户信息
      const userInfo = await store.dispatch('getUserInfoByToken');
      // 根据用户权限过滤路由规则
      await store.dispatch('generateRoutes', {
        roleRouters: userInfo.roleAuthName.split(','),
        userName: userInfo.userName,
      });
      router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
      // 新tab页打开工作流表单的时候不建立ws连接,避免造成多次重复连接.
      if (!to.path.includes('task')) {
        store.dispatch('initWebSocket', store.getters.name); // 建立ws连接
        // 获取菜单待办数量
        next({ ...to, replace: true } as any);
      } else {
        next({ ...to, replace: true } as any);
      }
    } else {
      // 此时虽然stroe中有动态路由，但是由于刷新页面导致router中变量已经释放，需要重新导入
      // 由于vue-router的BUG:https://github.com/vuejs/vue-router/issues/1859
      // 我只能给store做局部持久化
      next();
    }
  } else if (whiteList.includes(to.path)) {
    // 如果不存在Token & 当前地址在白名单内
    next();
  } else {
    // 如果不存在Token & 当前地址不在白名单内
    next('/login');
  }
});

// 路由全局后置钩子，不接受next不改变导航
router.afterEach((to) => {
  if ('/login,/404'.includes(to.path) === false) {
    Watermark.set(store.getters.realname, dayjs().format('YYYY年MM月DD日'));
  }
});
