const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const prodConfig = require('./webpack.prod')

prodConfig.plugins.push(new BundleAnalyzerPlugin({
  analyzerMode: 'static',
  openAnalyzer: true
}))

module.exports = new SpeedMeasurePlugin().wrap(prodConfig)
