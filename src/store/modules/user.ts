/**
 * @file 用户数据
 * @author BoBo
 * @copyright NanJing Anshare Tech .Com
 * @createDate 2018年11月13日20:24:53
 */
import {
  login, logout, getInfo, update,
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
    tel: '', // 用户电话号码,
    photo: '', // 用户头像base64
    candidateUser: '', // 临时授权人
    companyid: '', // 所属单位id
    companyname: '', // 所属单位名
    isAdmin: false, // 是否为系统管理员
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
    SET_ISLEADER: (state, leader) => {
      state.isLeader = leader;
    },
    SET_CANDIDATEUSER: (state, name) => {
      state.candidateUser = name;
    },
    SET_TEL: (state, tel) => {
      state.tel = tel;
    },
    SET_PHOTO: (state, photo) => {
      state.photo = photo;
    },
    SET_SIGNATURE: (state, signature) => {
      state.signature = signature;
    },
    SET_COMPANYID: (state, companyid) => {
      state.companyid = companyid;
    },
    SET_COMPANYNAME: (state, companyname) => {
      state.companyname = companyname;
    },
    SET_ISADMIN: (state, isadmin) => {
      state.isAdmin = isadmin;
    },
  },
  actions: {
    // 登录并设置token
    async setTokenByLogin({ commit }, userInfo) {
      // 如果配置了“不请求后端接口”
      if (process.env.VUE_APP_REQUEST_API === 'false') {
        // 直接返回首页
        const promise = new Promise((resolve) => {
          commit('SET_TOKEN', 'test');
          resolve();
        });
        return promise;
      }
      // 开发阶段直接登录而不请求后端接口
      const promise = await login(userInfo).then((res) => {
        // 登录成功
        if (res.code === 200) {
          commit('SET_TOKEN', res.data.token);
          // 关闭之前打开的标签
          commit('DEL_ALL_VIEWS');
          return res.data;
        }
        // 登录失败清空token
        commit('SET_TOKEN', null);

        // 600: 账号已过期（底层全局已经提示）
        // 800: 用户名或密码错误（需要上层提示）
        // 801: 该用户未绑定角色（需要上层提示）
        // 802: 单点登录校验不正确（需要上层提示）
        // 803: redis异常（需要上层提示）
        // 804: 账号已被锁定（需要上层提示）
        // 本层只做vuex操作，需要提示的话将res.code抛给上层
        return Promise.reject(res);
      });
      return promise;
    },
    // 根据token请求用户信息并设置到store
    async getUserInfoByToken({ commit, state }) {
      // 如果配置了“不请求后端接口”
      if (process.env.VUE_APP_REQUEST_API === 'false') {
        const promise = new Promise((resolve) => {
          const data = {
            RealName: '管理员',
            UserName: 'admin',
            RoleAuthName: '',
          };
          commit('SET_USER_REALNAME', data.RealName);
          commit('SET_USERNAME', data.UserName);
          resolve(data);
        });
        return promise;
      }
      // 请求userinfo接口获取用户名和可访问页面
      const promise = await getInfo().then((response) => {
        const { data } = response;
        commit('SET_USER_REALNAME', data.realName);
        commit('SET_USERNAME', data.userName);
        commit('SET_DEPTNAME', data.deptName);
        commit('SET_ROLENAME', data.roleName);
        commit('SET_DEPTID', data.deptID);
        commit('SET_USERID', data.userID);
        commit('SET_TEL', data.tel);
        commit('SET_CANDIDATEUSER', data.candidateUser);
        // 用户头像
        commit('SET_PHOTO', data.photo);
        // 用户签名
        commit('SET_SIGNATURE', data.signature);
        // 单位id
        commit('SET_COMPANYID', data.companyID);
        // 单位名
        commit('SET_COMPANYNAME', data.companyName);
        // 是否为admin账号
        commit('SET_ISADMIN', data.userName === 'admin');

        return data;
      });
      return promise;
    },
    // 删除客户端和服务端Token
    async clearToken({ commit }) {
      // 如果配置了“不请求后端接口”
      if (process.env.VUE_APP_REQUEST_API === 'false') {
        const promise = new Promise((resolve) => {
          commit('SET_TOKEN', null);
          window.location.reload();
          resolve();
        });
        return promise;
      }
      const promise = await logout().then(() => {
        commit('SET_TOKEN', null);
        window.location.reload();
      });
      return promise;
    },
    // 客户端timeOut
    async clientTimeOut({ commit }) {
      const promise = await logout().then(() => {
        commit('SET_TOKEN', null);
        MessageBox.alert('长时间未操作,登录超时,请重新登录', {
          confirmButtonText: '重新登录',
          showClose: false,
          callback: () => {
            window.location.reload();
          },
        });
      });
      return promise;
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
