module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      rootValue ({ file }) {
        // indexOf 找是否包含  -1就是不包含
        return (file.indexOf('vant') !== -1 || file.indexOf('github-markdown-css') !== -1) ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
