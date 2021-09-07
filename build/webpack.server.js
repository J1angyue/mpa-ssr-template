'use strict'

const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const {
  optimize: {
    LimitChunkCountPlugin
  }
} = require('webpack')

const baseConfig = require('./webpack.base')

const target = 'node'

const externals = nodeExternals({
  // 需要被webpack处理的资源
  allowlist: /\.(css|vue)$/
})

const output = {
  libraryTarget: 'commonjs2'
}

const plugins = [
  new WebpackManifestPlugin({
    fileName: 'server/manifest.ssr.json'
  }),
  new LimitChunkCountPlugin({
    maxChunks: 1
  })
]

const ssrConfig = {
  target,
  output,
  externals,
  plugins
}

module.exports = merge(baseConfig, ssrConfig)
