module.exports = {
  presets: [
    ['@babel/env'],
    ['@babel/react'],
    ['minify', {
      keepFnName: true,
      builtIns: false,
    }],
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties'],
  ],
};
