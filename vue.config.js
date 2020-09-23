const path = require('path')

const dirPath = {
  development: '/',
  production: '/'
}

module.exports = {
  publicPath: dirPath[process.env.NODE_ENV],
  outputDir: 'dist',
  lintOnSave: true,
  productionSourceMap: process.env.NODE_ENV === 'production',
  configureWebpack: {
    resolve: {
      alias: {
        '@api': path.resolve(__dirname, 'src/api'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@sass': path.resolve(__dirname, 'src/assets/sass'),
        '@img': path.resolve(__dirname, 'src/assets/images'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@data': path.resolve(__dirname, 'src/data'),
        '@com': path.resolve(__dirname, 'src/components'),
        '@js': path.resolve(__dirname, 'src/commonJs')
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "./src/assets/sass/index.scss"'
      },
      scss: {
        prependData: '@import "./src/assets/sass/index.scss";'
      }
    }
  },
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    open: true,
    https: false,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
}
