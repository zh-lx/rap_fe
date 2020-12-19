export const apiPath =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8801'
    : 'https://server.rap.zlxiang.com';
