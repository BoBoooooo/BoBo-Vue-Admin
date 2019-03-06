/*
 * @Author: BoBo
 * @Date: 2018-12-21 14:34:50
 * @Description: 全局vuex getter
 *
 * 调用时，在相应的vue中，imoprt该js
 * this.getters.token 即可获取
 */
const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  realname: state => state.user.realname,
  name: state => state.user.name,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers,

}
export default getters
