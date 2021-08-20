const fs = require('fs')
const path = require('path')
const express = require('express')
const { renderToString } = require('@vue/server-renderer')

const { resolve } = require('../build/helpers')
const manifest = require('../dist/server/manifest.ssr.json')

const PORT = 3000

const appPath = path.join(__dirname, '../dist', manifest['portal.js'])

const createApp = require(appPath).default

const template = fs.readFileSync(resolve('dist/server/portal/index.html')).toString()

const server = express()

server.get('*', async (req, res) => {
  const { app, router } = createApp()

  await router.push(req.url)
  await router.isReady()

  const appHTML = await renderToString(app)
  const resHTML = template.replace('<div id="app">', '<div id="app">' + appHTML)
  
  res.setHeader('Content-Type', 'text/html')
  res.send(resHTML)
})

server.listen(PORT, () => console.log('Server running at ' + PORT))
