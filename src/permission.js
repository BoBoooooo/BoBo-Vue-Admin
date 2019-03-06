/*
 * @Author: BoBo
 * @Date: 2018-12-23 10:58:07
 * @Last Modified by:   BoBo
 * @Last Modified time: 2018-12-23 10:58:07
 * @Description
 * 登录鉴权js,获取当前用户token身份信息以及所拥有的路由权限
 */
import router from './router';
import store from './store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import {
  getToken,
} from '@/utils/auth'; // 验权

const whiteList = ['/login'];
router.beforeEach(async (to, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: '/',
      });
    } else if (store.getters.addRouters.length === 0) {
      const res = await store.dispatch('GetInfo') // 拉取user_info
      const roleauthname = res.RoleAuthName.split(',')
      await store.dispatch('GenerateRoutes', {
        roleauthname,
      })
      // 根据roles权限生成可访问的路由表
      router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
      next({
        ...to,
        replace: true,
      })
    } else {
      next()
    }
  } else if (whiteList.includes(to.path)) {
    next()
  } else {
    next('/login')
    NProgress.done()
  }
});

router.afterEach(() => {
  NProgress.done() // 结束Progress.
})
