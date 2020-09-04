/**
 * @file 用户相关请求
 * @author BoBo
 * @copyright BoBo
 * @createDate 2018年11月13日20:27:16
 */
import axios from '@/plugins/axios';

// 用户登录
export function login(userInfo): any {
  return axios({
    url: '/users/login',
    method: 'post',
    data: userInfo,
  });
}

// 获取用户信息
export function getInfo() {
  return axios({
    url: '/users/userinfo',
    method: 'post',
  });
}

// 注销
export function logout() {
  return axios({
    url: '/users/logout',
    method: 'post',
  });
}

// 修改密码
export function update(data) {
  return axios({
    url: '/users/changepassword',
    method: 'post',
    params: data,
  });
}

/**
 * 按username查询用户
 * username
 * @param {String} names
 */

export function findByNames(names) {
  return axios({
    url: '/userss/findByNames',
    method: 'post',
    params: {
      names,
    },
  });
}
