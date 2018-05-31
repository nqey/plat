import { IMAGE_SERVER_URL } from '@/config/env';

/* eslint-disable */
// 格式化表单数据
const toFormData = (params) => {
  const ps = Object.entries(params);
  if (ps.length === 0) {
    return '';
  }
  if (ps.length === 1) {
    return `${encodeURIComponent(ps[0][0])}=${encodeURIComponent(ps[0][1])}`;
  }
  return ps.reduce((p, c, i) => {
    if (i === 1) {
      return `${encodeURIComponent(p[0])}=${encodeURIComponent(p[1])}&${encodeURIComponent(c[0])}=${encodeURIComponent(c[1])}`;
    }
    return `${p}&${encodeURIComponent(c[0])}=${encodeURIComponent(c[1])}`;
  });
};

// 删除对象-属性值为空的属性
const toRmEmpty = (params) => {
  const localParams = {};
  Object.keys(params || ({})).forEach((v) => {
    if (params[v] !== null && params[v] !== undefined) {
      localParams[v] = params[v];
    }
  });
  return localParams;
};

const formatDate = (date, fmt = 'yyyy-MM-dd hh:mm:ss') => {
  if (typeof date === 'number') {
    date = new Date(date);
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
};

const padLeftZero = (str) => {
  return `00${str}`.substr(str.length)
};

/**
 * 获取图片的全路径
 * 详见官网： http://zimg.buaa.us/documents/
 * @param url ： 图片地址
 * @param params : { w ： 宽度, h ： 高度, q ： 质量的百分比(0-100整数), f : png/jpg（图片格式）, r : 旋转度数(0-360整数) }
 * @return [] | String : 传入的url是一个数组，则返回数组，传入一个string则返回单个url
 */
const getPictureUrl = (url, params = {}) => {
  const p = Object.entries(params)
    .map(s => `${s[0]}=${s[1]}`)
    .reduce((a, b) => `${a}&${b}`);

  if (typeof url === 'string') {
    return IMAGE_SERVER_URL + url + (url.indexOf('?') >= 0 ? '&' : '?') + p;
  } else {
    return url.map(v => IMAGE_SERVER_URL + v + (v.indexOf('?') >= 0 ? '&' : '?') + '?' + p);
  }
};

export {
  toFormData,
  toRmEmpty,
  formatDate,
  getPictureUrl,
};
