const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  // avatar: state => state.user.avatar,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  realname:state=>state.user.realname,
  name: state => state.user.name,
  permission_routers: state => state.user.routers,
  addRouters: state => state.user.addRouters
}
export default getters
