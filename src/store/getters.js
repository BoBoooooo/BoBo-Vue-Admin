const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  // avatar: state => state.user.avatar,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  realname:state=>state.user.realname,
  name: state => state.user.name,
  addRouters: state => state.permission.addRouters,
  routers:state=>state.permission.routers

}
export default getters
