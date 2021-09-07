const fs = require('fs')
const express = require('express')
const { renderToString } = require('@vue/server-renderer')

const { resolve, apps, join } = require('../build/helpers')

const PORT = 3000

const server = express()

server.use(
  '/server/img',
  express.static(resolve('dist/server/img'))
)
server.use(
  '/server/js',
  express.static(resolve('dist/server/js'))
)
server.use(
  '/server/css',
  express.static(resolve('dist/server/css'))
)

async function renderApp (url) {
  const appName = url.split('/')[2]
  const manifest = require('../dist/server/manifest.ssr.json')
  const appPath = join('dist', manifest[appName + '.js'])
  const createApp = require(appPath).default
  const { app, router } = createApp()
  await router.push(url)
  await router.isReady()
  const appHTML = await renderToString(app)
  const template = fs.readFileSync(resolve('dist/server/' + appName + '/index.html')).toString()
  return template.replace('<div id="app">', '<div id="app">' + appHTML)
}

server.get(
  new RegExp('/server/(' +
  apps.reduce((res, app, i) => res += app.name + (i < apps.length - 1 ? '|' : ''), '') +
  ')/*'),
  async (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.send(await renderApp(req.url))
  }
)

server.listen(PORT, () => console.log('Server running at ' + PORT))
