/*
 * @Author: BoBo
 * @Date: 2018-12-21 14:33:55
 * @Description: 工具函数  （深拷贝, 新建一个guid, 时间转换函数）
 */


export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (time.length === 10) {
      time = parseInt(time, 10) * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = `0${value}`
    }
    return value || 0
  })

  return timeStr
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } if (diff < 3600) { // less 1 hour
    return `${Math.ceil(diff / 60)}分钟前`
  } if (diff < 3600 * 24) {
    return `${Math.ceil(diff / 3600)}小时前`
  } if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  }
  return `${d.getMonth() + 1}月${d.getDate()}日${d.getHours()}时${d.getMinutes()}分`
}

export function newGuid() {
  let guid = '';
  for (let i = 1; i <= 32; i++) {
    const n = Math.floor(Math.random() * 16.0).toString(16);
    guid += n;
    if ((i === 8) || (i === 12) || (i === 16) || (i === 20)) { guid += '-'; }
  }
  return guid;
}

export function deepClone(obj) {
  const result = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        result[key] = deepClone(obj[key]); // 递归复制
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}

/**
 * 获取当前日期  2019年01月01日
 */
export function DateTimeNow() {
  const date = new Date();
  const Y = `${date.getFullYear()}年`;
  const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}月`;
  const D = `${date.getDate() + 1 < 10 ? `0${date.getDate()}` : date.getDate()}日`;
  return Y + M + D;
}


/**
 * yyyy-MM-dd HH:mm:ss 转 2019年1月1日
 */
export function DateTimeFormat(time) {
  let date = time.split(' ')[0];
  date = date.replace('-', '年');
  date = date.replace('-', '月');
  date += '日';
  return date;
}

/**
 * 时间戳转标准时间格式
 * @param {String} timestamp
 */
export function timestampToTime(timestamp) {
  const date = new Date(timestamp); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = `${date.getFullYear()}-`;
  const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
  const D = `${date.getDate() + 1 < 10 ? `0${date.getDate() + 1}` : date.getDate() + 1}-`;
  const h = `${date.getHours() + 1 < 10 ? `0${date.getHours() + 1}` : date.getHours() + 1}:`;
  const m = `${date.getMinutes() + 1 < 10 ? `0${date.getMinutes() + 1}` : date.getMinutes() + 1}:`;
  const s = date.getSeconds() + 1 < 10 ? `0${date.getSeconds() + 1}` : date.getSeconds() + 1;
  console.log(Y + M + D + h + m + s);
  return Y + M + D + h + m + s;
}


/**
 * 获取当前日期  2019-01-11
 */
export function DateTimeNowSplit() {
  const date = new Date();
  const Y = `${date.getFullYear()}-`;
  const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
  const D = `${date.getDate()}`;
  return Y + M + D;
}


/**
 * 通过身份证获取性别年龄出生年月
 * @param {String} card
 */
export function getAnalysisIdCard(card) {
  const person = {};
  // 获取出生日期
  person.birth = `${card.substring(6, 10)}年${card.substring(10, 12)}月${card.substring(12, 14)}日`;

  // 获取性别
  // eslint-disable-next-line radix
  if (parseInt(card.substr(16, 1)) % 2 === 1) {
    // 男
    person.sex = '男';
  } else {
    // 女
    person.sex = '女';
  }


  // 获取年龄

  const myDate = new Date();

  const month = myDate.getMonth() + 1;

  const day = myDate.getDate();

  let age = myDate.getFullYear() - card.substring(6, 10) - 1;

  if (card.substring(10, 12) < month || (card.substring(10, 12) === month && card.substring(12, 14) <= day)) {
    age += 1;
  }

  person.age = age;
  return person;
}
