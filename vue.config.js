const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

console.log(CopyPlugin);

module.exports = {
  chainWebpack(config) {
    /* config
      .plugin('html')
      .tap(args => {
        args[0].template = '/Users/Shared/project/mock_vue/public/a.html'
        return args
      }) */
    config.plugin('copy').tap(args => {
      args[0][0].ignore.push({
        glob: 'a.html',
        matchBase: false
      })
      return args
    })
  }
}