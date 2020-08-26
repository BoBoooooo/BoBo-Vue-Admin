/**
 * @file 用户相关请求
 * @author BoBo
 * @copyright BoBo
 * @createDate 2018年11月13日20:27:16
 */
import axios from '@/plugins/axios';

// 用户登录
export function login(userInfo):any {
  return axios({
    url: '/user/login',
    method: 'post',
    params: userInfo,
  });
}

// 获取用户信息
export function getInfo() {
  return axios({
    url: '/user/userinfo',
    method: 'post',
  });
}

// 注销
export function logout() {
  return axios({
    url: '/user/logout',
    method: 'post',
  });
}

// 修改密码
export function update(data) {
  return axios({
    url: '/user/changepassword',
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
    url: '/users/findByNames',
    method: 'post',
    params: {
      names,
    },
  });
}

/**
 * 统计在线人数
 */
export function onlineNumbers() {
  return axios({
    url: '/users/olCount',
    method: 'post',
  });
}
