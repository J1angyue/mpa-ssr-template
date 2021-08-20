const { merge } = require('webpack-merge')
const createBaseConfig = require('./webpack.base')

const devServer = {
  port: 8090,
  hot: true,
  quiet: true,
  writeToDisk: true,
  historyApiFallback: true
}

const devConfig = {
  mode: 'development',
  devServer,
  devtool: 'cheap-module-eval-source-map'
}

module.exports = merge(createBaseConfig(), devConfig)
