/*
 * @file: 工具函数
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2020年02月20 09:24:27
 */

// color函数 rgb转hex格式
export function hexToRgba(hex, opacity) {
  // eslint-disable-next-line radix
  return `rgba(${parseInt(`0x${hex.slice(1, 3)}`)},${parseInt(`0x${hex.slice(3, 5)}`)},${parseInt(`0x${hex.slice(5, 7)}`)},${opacity})`;
}

/**
 * 防抖函数
 * @param method
 * @param params
 */
export function debounce(method, params) {
  let timer:any = null;
  // eslint-disable-next-line func-names
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      method(params); // 即调用handlerResize，params即传入的参数eleArr
    }, 300);
  };
}
