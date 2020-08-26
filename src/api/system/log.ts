/*
 * @file: 日志api
 * @copyright: BoBo
 * @author: BoBo
 * @Date: 2019年10月15 10:02:28
 */
import axios from '@/plugins/axios';

/**
 * 登录日志
 *
 * @returns 所有登录日志
 */
export function getLoginLog(data) {
  return axios({
    url: '/log/listLogin',
    method: 'post',
    data,
  });
}


/**
 * 运行日志
 *
 * @returns 所有运行日志
 */
export function getActionLog(data) {
  return axios({
    url: '/log/listNoLogin',
    method: 'post',
    data,
  });
}
/**
 * 异常日志
 *
 * @returns 所有异常日志
 */
export function getExceptionLog(data) {
  return axios({
    url: '/log/listException',
    method: 'post',
    data,
  });
}
