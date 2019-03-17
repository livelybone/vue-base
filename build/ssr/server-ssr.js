'use strict'
const express = require('express')
const App = express()
const fs = require('fs')
const chalk = require('chalk')
const LRU = require('lru-cache')
const serverRenderer = require('vue-server-renderer')
const chokidar = require('chokidar')
const utils = require('../utils')
const ssrUtils = require('./ssr-utils')
const config = require('../../config/index')

let renderer

function createRenderer(log) {
  renderer = serverRenderer.createBundleRenderer(
    JSON.parse(ssrUtils.readFile('dist', config.server.serverBundle)),
    {
      runInNewContext: 'once',
      template: ssrUtils.readFile('index.html'),
      clientManifest: JSON.parse(ssrUtils.readFile('dist', config.server.clientManifest)),
      cache: LRU({
        max: 1000,
        maxAge: 1000, // 1s
      }),
    },
  )
  if (log !== false) console.log('`renderer` changed \n\r\n\r')
}

const watcher = chokidar.watch([
  utils.pathResolve('dist', config.server.serverBundle),
  utils.pathResolve('dist', config.server.clientManifest),
  utils.pathResolve('index.html'),
])

createRenderer(false)
watcher.on('change', createRenderer)

const port = process.env.PORT || 3000

const serve = (path, cache) => express.static(utils.pathResolve(path), {
  maxAge: cache && 1000 * 60 * 60 * 24 * 30,
})

App.use('/dist', serve('dist/js', true))
App.use('/static', serve('dist/static', true))

App.get('/favicon.ico', (req, res) => {
  const path = utils.pathResolve('dist/static/favicon.ico')
  if (fs.existsSync(path)) {
    res.end(ssrUtils.readFile(path))
  } else {
    res.status(404).end('Not found')
  }
})

App.get('*', (req, res) => {
  const context = { url: req.url }
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  renderer.renderToString(context, (e, html) => {
    if (e) {
      console.log(chalk.red(e))
      if (e.code === 404) res.status(404).end('Page not found')
      else res.status(500).end('Internal Server Error')
    } else res.end(html)
  })
})

App.listen(port, e => {
  if (e) console.error(chalk.red(e))
  else console.log('==> Listening on port %s. Open up http://yourip:%s/ in your browser.', port, port)
})
