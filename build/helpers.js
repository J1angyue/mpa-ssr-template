const path = require('path')
const fs = require('fs')

const renderType = process.env.RENDER_TYPE || 'client'

function resolve(...paths) {
  return path.resolve(__dirname, '..', ...paths)
}

function join(...paths) {
  return path.join(__dirname, '../', ...paths)
}

function getApps() {
  const appsPath = join('src', 'apps')
  const appsDirs = fs.readdirSync(appsPath)
  const apps = []
  for (const dir of appsDirs) {
    const appPath = resolve(appsPath, dir)
    const template = resolve(appPath, 'index.html')
    const entry = resolve(appPath, 'entry.' + renderType + '.js')

    if (
      !fs.existsSync(entry) || !fs.existsSync(template)
    ) {
      continue
    }
    apps.push({ name: dir, entry, template })
  }
  return apps
}

Object.assign(exports, {
  join,
  resolve,
  renderType,
  apps: getApps(),
})
