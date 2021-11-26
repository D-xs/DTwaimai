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
  },
  devServer: {
    proxy: {
      '/api': {// 匹配所有以 '/api'开头的请求路径
        target: 'http://localhost:4000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api': ''}
      },
    }
  }
}
