import router from './router';
import store from './store';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import {
  getToken,
} from '@/utils/auth'; // 验权

const whiteList = ['/login'];
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: '/',
      });
    } else if (store.getters.addRouters.length === 0) {
      store.dispatch('GetInfo').then((res) => { // 拉取user_info
        const roleauthname = res.RoleAuthName.split(',')
        store.dispatch('GenerateRoutes', {
          roleauthname,
        }).then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({
            ...to,
            replace: true,
          })
          // hack方法 确保addRoutes已完成
        })
      })
    } else {
      next()
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    next('/login')
    NProgress.done()
  }
});

router.afterEach(() => {
  NProgress.done() // 结束Progress.
})
