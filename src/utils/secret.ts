/*
 * @file: AES加密解密工具
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2020年04月24 13:47:47
 */

import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('1101101101101111'); // 十六位十六进制数作为密钥

// 解密方法
export function Decrypt(word) {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr;
}

// 加密方法
export function Encrypt(word) {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}
