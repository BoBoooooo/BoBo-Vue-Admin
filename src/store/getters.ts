/*
 * @file: vuex getters
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2019-07-09 14:30:43
 */
const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  realname: state => state.user.realname,
  name: state => state.user.username,
  deptname: state => state.user.deptname,
  rolename: state => state.user.rolename,
  deptid: state => state.user.deptid,
  addRouters: state => state.asyncRouters.addRouters,
  routers: state => state.asyncRouters.routers,
  userid: state => state.user.userid,
  webSocket: state => state.webSocket.websocket,
  photo: state => state.user.photo,
  config: state => state.app.config,
};
export default getters;
