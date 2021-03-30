/**
 * @file 封装原生axios，在main.ts和api层引用本文件
 * @author BoBo
 * @copyright BoBo
 * @createDate 2018年11月13日10:52:32
 */
import axios from 'axios';
import { Message, MessageBox } from 'element-ui';// eslint-disable-line
import NProgress from 'nprogress'; // 全局进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import store from '../store';

NProgress.configure({ showSpinner: false });

// axios详细配置参考：
// https://github.com/axios/axios#request-config

// 创建axios实例
const service = axios.create({
  baseURL: window.__HOST__URL__ + window.__PREFIX__URL__, // 后端接口根路径
  timeout: 60 * 1000, // 请求超时时间
});

// 拦截请求
service.interceptors.request.use(
  (config) => {
    // 全局进度条loading
    NProgress.start();
    if (store.getters.token && store.getters.token !== 'null') {
      // 让每个请求携带自定义token
      config.headers.Authorization = store.getters.token;
    }
    return config;
  },
  (error) => {
    // 请求出错
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    Promise.reject(error);
  }
);

// 拦截响应
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    const { message, code } = res;

    NProgress.done();
    // 600表示token异常需要重新登录
    if (code === 600) {
      Message({
        message: '账号已过期，重新登录。',
        type: 'error',
        duration: 1000,
      });
      setTimeout(() => {
        // 清空token
        store.commit('SET_TOKEN', null);
        // 跳转登录页
        window.location.reload(); // 为了重新实例化vue-router对象，避免bug
      }, 1000);
    } else if (code === 500) {
      // 极端情况服务器错误
      MessageBox.alert(`状态码：500<br>接口：${response.request.responseURL}<br>原因：${message}`, '请截图并联系运维人员', {
        confirmButtonText: '我知道了',
        type: 'warning',
        dangerouslyUseHTMLString: true,
        customClass: 'msgBox',
        showClose: true,
      });
    } else if (code !== 200) {
      // 业务失败情况统一拦截
      MessageBox.alert(`原因：${message}`, '操作失败', {
        confirmButtonText: '我知道了',
        type: 'warning',
        showClose: true,
      });
    }
    // 正常响应继续传递
    return res;
  },
  (error) => {
    NProgress.done();
    // http状态码200以外的情况
    // 请检查网络链接或联系管理员
    MessageBox.alert(error.response.data.message, '服务器异常', {
      confirmButtonText: '重试',
      type: 'warning',
    });

    return Promise.reject(error);
  }
);

export default service;
