const { merge } = require('webpack-merge')
const { VueLoaderPlugin } = require('vue-loader')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const { DllReferencePlugin } = require('webpack')

const { resolve, join, renderType } = require('./helpers')
const createMPAConfig = require('./createMPAConfig')
const isProd = process.env.NODE_ENV === 'production'

const baseConfig = {
  mode: process.env.NODE_ENV || 'development',
  stats: 'errors-only',
  resolve: {
    modules: [resolve('node_modules')]
  },
  output: {
    hashDigestLength: 8,
    path: resolve('dist'),
    publicPath: '/',
    filename: renderType + '/js/[name]' + (isProd ? '.[contenthash]' : '') + '.js',
    chunkFilename: renderType + '/js/' + (isProd ? '[name].[chunkhash]' : '[id]') + '.js'
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          isProd
            ? MiniCssExtractPlugin.loader
            : 'vue-style-loader',
          // 'thread-loader',
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
        test: /\.vue$/,
        use: [
          // 'thread-loader',
          'vue-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          // 'thread-loader',
          'babel-loader'
        ],
        exclude: resolve('node_modules')
      },
      {
        test: /\.(jpe?g|gif|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024 * 10,
            name: renderType + '/img/[name].[contenthash:8].[ext]'
          }
        }
      }
      ,
      {
        test: /\.(ttf|woff2?)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024 * 10,
            name: renderType + '/font/[name].[contenthash:8].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new CssMinimizerPlugin(),
    new MiniCssExtractPlugin({
      filename: renderType + '/css/[name].[contenthash:8].css',
      chunkFilename: renderType + '/css/[name].[contenthash:8].css'
    }),
    new DllReferencePlugin({
      manifest: require(resolve('dll/vuelibs.manifest.json'))
    }),
    new AddAssetHtmlPlugin({
      filepath: join('dll', '*.js'),
      publicPath: '/' + renderType + '/js',
      outputPath: renderType + '/js'
    })
  ]
}

module.exports = merge(baseConfig, createMPAConfig(renderType))
