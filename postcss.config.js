// const isProd = process.env.NODE_ENV === 'production'
const autoprefixer = require('autoprefixer')

const plugins = []

// if (isProd) {
  plugins.push(autoprefixer())
// }

const config = {
  plugins
}


module.exports = config
