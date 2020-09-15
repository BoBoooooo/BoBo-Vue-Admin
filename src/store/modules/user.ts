/**
 * @file 用户数据
 * @author BoBo
 * @copyright NanJing Anshare Tech .Com
 * @createDate 2018年11月13日20:24:53
 */
import {
  login, getInfo, update,
} from '@/api/user';
import { MessageBox } from 'element-ui';


const user = {
  state: {
    token: sessionStorage.getItem('token'),
    realname: '', // 用户姓名
    username: '', // 用户登录名
    rolename: '', // 用户角色名
    deptname: '', // 用户部门名
    deptid: '', // 用户部门id
    userid: '', // 用户ID
    photo: '', // 用户头像base64
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      sessionStorage.setItem('token', token);
      state.token = token;
    },
    SET_USER_REALNAME: (state, realname) => {
      state.realname = realname;
    },
    SET_USERNAME: (state, username) => {
      state.username = username;
    },
    SET_ROLENAME: (state, rolename) => {
      state.rolename = rolename;
    },
    SET_DEPTNAME: (state, deptname) => {
      state.deptname = deptname;
    },
    SET_DEPTID: (state, deptid) => {
      state.deptid = deptid;
    },
    SET_USERID: (state, userid) => {
      state.userid = userid;
    },
    SET_PHOTO: (state, photo) => {
      state.photo = photo;
    },
  },
  actions: {
    // 登录并设置token
    async setTokenByLogin({ commit }, userInfo) {
      // 开发阶段直接登录而不请求后端接口
      const promise = await login(userInfo).then((res) => {
        // 登录成功
        if (res.code === 200) {
          commit('SET_TOKEN', `Bearer ${res.data.token}`);
          // 关闭之前打开的标签
          commit('DEL_ALL_VIEWS');
          return res.data;
        }
        // 登录失败清空token
        commit('SET_TOKEN', null);
        return Promise.reject(res);
      });
      return promise;
    },
    // 根据token请求用户信息并设置到store
    async getUserInfoByToken({ commit, state }) {
      // 请求userinfo接口获取用户名和可访问页面
      const promise = await getInfo().then((response) => {
        const { data } = response;
        commit('SET_USER_REALNAME', data.realName);
        commit('SET_USERNAME', data.userName);
        commit('SET_DEPTNAME', data.deptName);
        commit('SET_ROLENAME', data.roleName);
        commit('SET_DEPTID', data.deptID);
        commit('SET_USERID', data.userID);
        // 用户头像
        commit('SET_PHOTO', data.photo);
        return data;
      });
      return promise;
    },
    // 删除客户端和服务端Token
    async clearToken({ commit }) {
      commit('SET_TOKEN', null);
      window.location.reload();
    },
    // 客户端timeOut
    async clientTimeOut({ commit }) {
      commit('SET_TOKEN', null);
      MessageBox.alert('长时间未操作,登录超时,请重新登录', {
        confirmButtonText: '重新登录',
        showClose: false,
        callback: () => {
          window.location.reload();
        },
      });
    },
    // 修改密码
    async changePassword({ commit }, {
      username,
      password,
    }) {
      const promise = await update({
        username,
        password,
      }).then(() => {
        commit('SET_TOKEN', null);
        window.location.reload();
      });
      return promise;
    },
  },
};

export default user;
