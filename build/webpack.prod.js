'use strict'
const { merge } = require('webpack-merge')
const {
  DefinePlugin
} = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin')
const glob = require('glob')

const baseConfig = require('./webpack.base')
const { resolve } = require('./helpers')

const optimization = {
  splitChunks: {
    chunks: 'all',
    name: 'true',
    cacheGroups: {
      vues: {
        test: /[\\/]node_modules[\\/](@?vue|vuex|vue-router)[\\/]/,
        priority: 20,
        name: 'vues'
      },
      thridpart: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10
      },
      common: {
        minChunks: 3,
        maxSize: 1024 * 240,
        minSize: 1024 * 10
      }
    }
  },
  minimizer: [
    new TerserPlugin({
      parallel: true,
      cache: true,
      extractComments: false
    })
  ]
}

const plugins = [
  new DefinePlugin({
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false'
  }),
  new HardSourceWebpackPlugin(),
  new HardSourceWebpackPlugin.ExcludeModulePlugin([
    {
      test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
    }
  ]),
  // TODO: .vue文件无法tree shake
  new PurgecssWebpackPlugin({
    paths: glob.sync(`${resolve('src')}/**/*`, { nodir: true }),
    safelist: { standard: [ /data-v-.*/ ] }
  })
]

const prodConfig = {
  optimization,
  plugins
}

module.exports = merge(baseConfig, prodConfig)
