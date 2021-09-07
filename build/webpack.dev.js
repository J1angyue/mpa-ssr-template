const { merge } = require('webpack-merge')
const { renderType, apps } = require('./helpers')
const baseConfig = require('./webpack.base')

const devServer = {
  port: 8090,
  hot: true,
  quiet: true,
  writeToDisk: true,
  historyApiFallback: {
    rewrites: apps.map(app => ({
      from: new RegExp('^/' + renderType + '/' + app.name + '/.*'),
      to: '/' + renderType + '/' + app.name + '/index.html'
    }))
  }
}

const devConfig = {
  devServer,
  devtool: 'cheap-module-eval-source-map'
}

module.exports = merge(baseConfig, devConfig)
