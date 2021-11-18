const publicPath = {
  development: '/',
  production: '/beans-admin-plugin'
}[process.env.NODE_ENV] || '/';

module.exports = {
  configureWebpack: require('./webpack.config'),
  publicPath,
  runtimeCompiler: true,
  devServer: {
    port: process.env.PORT
  }
}
