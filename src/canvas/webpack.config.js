const htmlWebpackPlugin = require('html-webpack')

module.exports = {
  plugins: [
    new htmlWebpackPlugin({
    template: './index.html'
    })
    ]
  }