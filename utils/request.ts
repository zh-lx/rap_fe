import { apiPath } from 'config/env';
// 基础的fetch封装
const baseFetch = (url, options) => {
  return fetch(`${apiPath}${url}`, options)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw new Error(err);
    });
};
type Options = {
  data: {
    [key: string]: any;
  };
  [prop: string]: any;
};

// $fetch.get(url, {data: {}})
// $fetch.post(url, {data: {}})
export const $fetch = {
  get: (url: string, options: Options) => {
    const { data } = options;
    // 将data中参数拼接到url上
    let params = [];
    if (data) {
      for (let key in data) {
        params.push(`${key}=${data[key]}`);
      }
      url += `?${params.join('&')}`;
    }
    return baseFetch(url, {
      ...options,
      method: 'GET',
    });
  },
  post: (url: string, options: Options) => {
    const { data = {} } = options;
    return baseFetch(url, {
      ...options,
      method: 'POST',
      body: data,
    });
  },
};
