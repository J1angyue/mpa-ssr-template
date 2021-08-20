'use strict'
const {
  DefinePlugin
} = require('webpack')

const { merge } = require('webpack-merge')
const createBaseConfig = require('./webpack.base')

const optimization = {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendors: {
        test: /(vue|vuex|vue-router)/,
        name: 'vue',
        priority: 20
      },
      thridpart: {
        test: /[\\/]node_modules[\\/]/,
        priority: 10
      },
      common: {
        minChunks: 3,
        maxSize: 1024 * 240,
        minSize: 1024 * 10
      }
    }
  }
}

const plugins = [
  new DefinePlugin({
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false'
  })
]

const prodConfig = {
  mode: 'production',
  optimization,
  plugins
}

module.exports = merge(createBaseConfig(), prodConfig)
