/**
 * @file 验证
 * @author BoBo
 * @copyright NanJing Anshare Tech .Com
 * @createDate 2018年11月14日14:03:43
 */

/* 合法uri */
export function validateURL(textval) {
  // eslint-disable-next-line max-len
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* 小写字母 */
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母 */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母 */
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

export function toCamelCase(str) {
  const arr = str.split(',');
  let formatStr = '';
  for (let i = 0; i < arr.length; i += 1) {
    const subStr = arr[i];
    const subArr = subStr.split('_');
    for (let j = 0; j < subArr.length; j += 1) {
      subArr[j] = subArr[j].charAt(0).toUpperCase() + subArr[j].substring(1);
    }
    formatStr += `${subArr.join('')},`;
  }
  formatStr = formatStr.substring(0, formatStr.length - 1);

  return formatStr;
}
