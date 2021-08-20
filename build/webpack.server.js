'use strict'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const {
  optimize: {
    LimitChunkCountPlugin
  }
} = require('webpack')

const { resolve } = require('./helpers')
const { entry, plugins } = require('./createMPAConfig')('server')

const mode = 'production'
const devtool = 'none'
const target = 'node'
const externals = nodeExternals({
  // 需要被webpack处理的资源
  allowlist: /\.(css|vue)$/
})

const output = {
  path: resolve('dist'),
  filename: 'server/[name]/entry.js',
  publicPath: '/',
  libraryTarget: 'commonjs2'
}

const devServer = {
  port: 8090,
  hot: true,
  writeToDisk:true
}

const modules = {
  rules: [
    {
      test: /\.vue$/,
      use: 'vue-loader'
    },
    {
      test: /\.js$/,
      use: 'babel-loader'
    },
    {
      test: /\.(le|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        {
          loader: 'px2rem-loader',
          options: {
            remUnit: 75,
            remPrecision: 8
          }
        },
        'less-loader'
      ]
    },
    {
      test: /\.(jpe?g|gif|png|ttf|woff2?)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1024 * 10,
          name: '[name].[hash:8].[ext]'
        }
      }
    }
  ]
}

plugins.push(...([
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash:8].css'
  }),
  new CssMinimizerPlugin(),
  new CleanWebpackPlugin(),
  new VueLoaderPlugin(),
  new WebpackManifestPlugin({
    fileName: 'server/manifest.ssr.json'
  }),
  new LimitChunkCountPlugin({
    maxChunks: 1
  })
]))

const config = {
  mode,
  entry,
  target,
  output,
  devServer,
  devtool,
  externals,
  // optimization,
  module: modules,
  plugins
}

module.exports = config
