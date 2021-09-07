const HTMLWebpackPlugin = require('html-webpack-plugin')
const { apps } = require('./helpers')

// const HTMLWebpackExternalsPlugin = require('html-webpack-externals-plugin')
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

function createMPAConfig(renderType) {
  const plugins = []
  const entrys = {}

  for (const { name, template, entry } of apps) {
    entrys[name] = entry
    plugins.push(
      new HTMLWebpackPlugin({
        template,
        chunks: [name],
        filename: renderType + '/' + name + '/index.html',
        inject: 'body',
        minify: {
          minifyJS: true,
          removeComments: true,
          collapseWhitespace: true,
        }
      })
      // new HTMLWebpackExternalsPlugin({
      //   externals,
      //   hash: true,
      //   files: [templateFileName]
      // })
    )
  }

  return { plugins, entry: entrys }
}

module.exports = createMPAConfig
