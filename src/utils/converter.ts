/**
 * @file 公共转换器
 * @author BoBo
 * @copyright NanJing Anshare Tech .Com
 * @createDate 2018年11月23日17:35:33
 */

/**
 * 千分位计算
 *
 * @export
 * @param {*} num
 * @returns
 */
export function formateThousandBit(num) {
  const reg = /\d{1,3}(?=(\d{3})+$)/g;
  return `${num}`.replace(reg, '$&,');
}

/**
 * 全屏函数
 */
export function toggleFullScreen() {
  const doc:any = window.document;
  const docEl:any = doc.documentElement;

  const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
}


/**
 * 通过身份证获取性别年龄出生年月
 * @param {String} card
 */
export function getAnalysisIdCard(card) {
  const person:any = {};
  // 获取出生日期
  const cardMonth = card.substring(10, 12);
  person.birthdate = `${card.substring(6, 10)}年${cardMonth.startsWith('0') ? cardMonth.substring(1) : cardMonth}月`;

  // 获取性别
  // eslint-disable-next-line radix
  if (parseInt(card.substr(16, 1)) % 2 === 1) {
    // 男
    person.personsex = '男';
  } else {
    // 女
    person.personsex = '女';
  }

  // 获取年龄
  const myDate = new Date();
  const month = myDate.getMonth() + 1;
  const day = myDate.getDate();
  let age = myDate.getFullYear() - card.substring(6, 10) - 1;

  if (card.substring(10, 12) < month || (card.substring(10, 12) === month && card.substring(12, 14) <= day)) {
    age += 1;
  }

  person.personage = `${age}岁`;
  return person;
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += `${className}`;
  } else {
    classString = classString.substr(0, nameIndex)
      + classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}

export function timeAgo(dateTimeStamp):string { // dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  let result = '';
  const minute = 1000 * 60; // 把分，时，天，周，半个月，一个月用毫秒表示
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const halfamonth = day * 15;
  const month = day * 30;
  const now = new Date().getTime(); // 获取当前时间毫秒
  const diffValue = now - dateTimeStamp;// 时间差
  const minC = diffValue / minute; // 计算时间差的分，时，天，周，月
  const hourC = diffValue / hour;
  const dayC = diffValue / day;
  const weekC = diffValue / week;
  const monthC = diffValue / month;
  if (monthC >= 1 && monthC <= 3) {
    result = ` ${Math.floor(monthC)}月前`;
  } else if (weekC >= 1 && weekC <= 3) {
    result = ` ${Math.floor(weekC)}周前`;
  } else if (dayC >= 1 && dayC <= 6) {
    result = ` ${Math.floor(dayC)}天前`;
  } else if (hourC >= 1 && hourC <= 23) {
    result = ` ${Math.floor(hourC)}小时前`;
  } else if (minC >= 1 && minC <= 59) {
    result = ` ${Math.floor(minC)}分钟前`;
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = '刚刚';
  } else {
    const datetime = new Date();
    datetime.setTime(dateTimeStamp);
    const Nyear = datetime.getFullYear();
    const Nmonth = datetime.getMonth() + 1 < 10 ? `0${datetime.getMonth() + 1}` : datetime.getMonth() + 1;
    const Ndate = datetime.getDate() < 10 ? `0${datetime.getDate()}` : datetime.getDate();
    const Nhour = datetime.getHours() < 10 ? `0${datetime.getHours()}` : datetime.getHours();
    const Nminute = datetime.getMinutes() < 10 ? `0${datetime.getMinutes()}` : datetime.getMinutes();
    const Nsecond = datetime.getSeconds() < 10 ? `0${datetime.getSeconds()}` : datetime.getSeconds();
    result = `${Nyear}-${Nmonth}-${Ndate}`;
  }
  return result;
}
