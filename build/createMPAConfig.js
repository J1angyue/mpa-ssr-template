const fs = require('fs')


const HTMLWebpackPlugin = require('html-webpack-plugin')
// const HTMLWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const { resolve } = require('./helpers')

const isProd = process.env.NODE_ENV === 'production'
const ENTRY_TYPE = {
  CLIENT: 'client', SERVER: 'server'
}

// const externals = [
//   {
//     module: 'vue',
//     global: 'Vue',
//     entry: 'dist/vue.global.prod.js'
//   },
//   {
//     module: 'vue-router',
//     global: 'VueRouter',
//     entry: 'dist/vue-router.global.prod.js'
//   },
//   {
//     module: 'vuex',
//     global: 'Vuex',
//     entry: 'dist/vuex.global.prod.js'
//   }
// ]

const APPS_PATH = resolve('src/apps')

function createMPAConfig(entryType = ENTRY_TYPE.CLIENT) {
  const plugins = []
  const entry = {}
  const apps = fs.readdirSync(APPS_PATH)
  const output = {
    filename: entryType + '/js/[name]' + (isProd ? '.[contenthash:8]' : '') + '.js',
    chunkFilename: entryType + '/js/' + (isProd ? '[id].[contenthash:8]' : '[id]') + '.js'
  }

  for (const appName of apps) {
    const appDir = APPS_PATH + '/' + appName
    const template = appDir + '/index.html'
    const appEntry = appDir + '/entry.' + entryType + '.js'

    if (
      !fs.existsSync(appEntry) || !fs.existsSync(template)
    ) {
      continue
    }

    entry[appName] = appEntry
    const templateFileName = entryType + '/' + appName + '/index.html'
    plugins.push(
      new HTMLWebpackPlugin({
        template,
        chunks: [appName],
        inject: 'body',
        filename: templateFileName,
        minify: true
      })
      // new HTMLWebpackExternalsPlugin({
      //   externals,
      //   hash: true,
      //   files: [templateFileName]
      // })
    )
  }

  return { plugins, entry, output }
}

module.exports = createMPAConfig
