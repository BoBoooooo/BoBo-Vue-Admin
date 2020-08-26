
/**
 * 密码校验
 * @param {String} sValue
 */
export default function checkStrong(sValue) {
  let modes = 0;
  // 正则表达式验证符合要求的
  if (sValue.length < 1) return modes;
  if (/\d/.test(sValue)) modes += 1; // 数字
  if (/[a-z]/.test(sValue)) modes += 1; // 小写
  if (/[A-Z]/.test(sValue)) modes += 1; // 大写
  if (/\W/.test(sValue)) modes += 1; // 特殊字符

  // 逻辑处理
  switch (modes) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 3:
    case 4:
      return sValue.length < 12 ? 3 : 4;
    default: return modes;
  }
}
