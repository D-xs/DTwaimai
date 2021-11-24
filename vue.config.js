const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'api': '@/api',
        'common': '@/common',
        'components': '@/components',
        'filters': '@/filters',
        'pages': '@/pages',
        'mock': '@/mock'
      }
    }
  }
}
