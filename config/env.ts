export const apiPath =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8801'
    : 'http://server.rap.zlxiang.com';
