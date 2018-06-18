
import axios from 'axios';
import _ from 'lodash';
import config from '@/config';

// Return result or throw err {code, message}
export default async (options, payload) => {
  let method;
  let path;
  let params;
  let data;

  if (typeof options === 'string') {
    path = options;
    method = 'get';
  } else {
    path = options.path;
    method = options.method;
  }

  if (method === 'get') {
    params = payload;
  } else {
    data = payload;
  }

  const url = `${config.apiUrl}${path}`;
  let res;

  try {
    res = await axios({
      method,
      url,
      data,
      params,
      json: true,
    });
  } catch (e) {
    const code = _.get(e, 'response.data.code') || 'REQUEST_FAIL';
    const message = _.get(e, 'response.data.message') || '请求失败';
    const error = { code, message };
    throw error;
  }

  if (res.status === 200) {
    return res.data;
  }

  const error = { code: 'UNKNOWN', message: '未知错误' };
  throw error;
};
