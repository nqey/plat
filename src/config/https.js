import axios from 'axios';
import { Message } from 'element-ui';
import { removeIllegalParams, toQueryString } from '@/config/utils';
import { get, set } from '@/config/cache';

// 表示跨域请求时是否需要使用凭证
axios.defaults.withCredentials = true;
// 超时时间20s
axios.defaults.timeout = 20000;

const paramsSerializer = params => toQueryString(removeIllegalParams(params));

// 添加请求拦截器
axios.interceptors.request.use((config) => {
  const con = config;
  con.paramsSerializer = paramsSerializer;
  // 在发送请求之前做些什么
  if (['post', 'put', 'patch'].indexOf(config.method) >= 0) {
    // 序列化
    con.data = toQueryString(config.data);
    con.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  } else if (config.method === 'upload') {
    config.method = 'post';
  }
  return con;
}, (error) => {
  Promise.reject(error);
});

const resultHandler = (res) => {
  // 判断http状态码
  if (res && [200, 304, 400].indexOf(res.status) > -1) {
    if (!res.data.success) {
      Message({
        type: 'error',
        position: 'bottom-right',
        message: res.data.message || '操作失败！',
        title: '错误',
      });
    } else {
      // do nothing now
    }
  } else {
    Message({
      type: 'error',
      position: 'bottom-right',
      message: '网络异常',
      title: '错误',
    });
  }
  return res.data;
};

axios.interceptors.response.use((response) => {
  // Do something with response data
  const data = resultHandler(response, response.config.method !== 'get');
  // 如果设置了缓存就把数据存入缓存
  const opt = response.config.opt || ({});
  // 数据返回成功才缓存
  if (opt.cache && data.success) {
    set(opt.key, data, opt.cacheTimeout > 0 ? opt.cacheTimeout : 3600);
  }
  return response.data;
}, error => Promise.reject(error));

const Method = ['put', 'post', 'get', 'delete', 'patch', 'upload'];

/**
 *
 * @param method
 * @param url
 * @param data
 * @param opt :
  * - timeout : 最长等待时间
 * - cache: 是否将请求的数据缓存,默认不缓存;
 * - cacheTimeout: 缓存数据失效时间(单位秒), 默认1小时;
 *
 * @returns {*}
 */
const xhr = (method, url, data = {}, opt = { cache: false, cacheTimeout: 3600 }) => {
  method = (method || '').toLowerCase();
  if (Method.indexOf(method) === -1) {
    throw new Error(`The xhr method should be one of ${Method}`);
  }

  if (!url) {
    throw new Error(`The xhr url : ${url} is a wrong value!`);
  }

  const config = { method, url, opt };
  const { timeout } = opt;
  if (timeout) {
    config.timeout = timeout;
  }

  if (method === 'get') {
    config.params = data;
  } else {
    config.data = data;
  }

  const cache = opt.cache === true;
  const key = cache && (`${url}_${toQueryString(data)}`);
  opt.key = key;
  // 需要缓存
  if (cache) {
    const d = get(key);
    /* 先从缓存里面取, 如果取到就直接返回,没取到就发起http请求去取,再存入 */
    if (d != null) {
      return d;
    }
  }
  return axios(config);
};
export default {
  async get(url, data = {}, opt) {
    const res = await xhr('get', url, data, opt);
    return res;
  },
  async post(url, data = {}, opt) {
    const res = await xhr('post', url, data, opt);
    return res;
  },
  async put(url, data = {}, opt) {
    const res = await xhr('put', url, data, opt);
    return res;
  },
  async patch(url, data = {}, opt) {
    const res = await xhr('patch', url, data, opt);
    return res;
  },
  async delete(url, data = {}, opt) {
    const res = await xhr('delete', url, data, opt);
    return res;
  },
  async upload(url, data = {}, opt) {
    const res = await xhr('upload', url, data, opt);
    return res;
  },
};
