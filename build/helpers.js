const path = require('path')

function resolve(...paths) {
  return path.resolve(__dirname, '..', ...paths)
}

exports.resolve = resolve
