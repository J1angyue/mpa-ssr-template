const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { DllPlugin, DefinePlugin } = require('webpack')

const { resolve } = require('./helpers')

const entry = {
  vuelibs: [
    'vue', 'vuex', 'vue-router'
  ]
}

const output = {
  filename: '[name].[contenthash:8].js',
  path: resolve('dll'),
  libraryTarget: 'umd',
  library: '[name]_[chunkhash]'
}

const plugins = [
  new CleanWebpackPlugin(),
  new DefinePlugin({
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false'
  }),
  new DllPlugin({
    name: '[name]_[chunkhash]',
    path: resolve('dll', '[name].manifest.json')
  })
]

module.exports = {
  mode: 'production',
  entry,
  output,
  plugins
}
