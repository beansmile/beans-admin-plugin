const path = require('path')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  watchOptions: {
    ignored: /node_modules/
  },
  resolve: {
    alias: {
      '@': path.resolve('src')
    }
  },
  plugins: [
    // new BundleAnalyzerPlugin()
  ]
}
