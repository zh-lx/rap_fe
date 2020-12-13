module.exports = {
  plugins: {
    'postcss-px2rem': {
      remUnit: 16,
      exclude: /node_modules/i,
    },
  },
};
