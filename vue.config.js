module.exports = {
  configureWebpack: require('./webpack.config'),
  publicPath: '/',
  runtimeCompiler: true,
  devServer: {
    port: process.env.PORT
  }
}
