'use strict'
const express = require('express')
const App = express()
const path = require('path')
const fs = require('fs')
const resolve = file => path.resolve(__dirname, file)
const LRU = require('lru-cache')
const serverRenderer = require('vue-server-renderer')
const chokidar = require('chokidar')

let renderer

function readFile(url) {
  return fs.readFileSync(resolve(url), 'utf-8')
}

function createRenderer() {
  delete require.cache[require.resolve('../../dist/vue-ssr-server-bundle.json')]
  delete require.cache[require.resolve('../../dist/vue-ssr-client-manifest.json')]

  renderer = serverRenderer.createBundleRenderer(
    require('../../dist/vue-ssr-server-bundle.json'),
    {
      runInNewContext: 'once',
      template: readFile('../../index.html'),
      clientManifest: require('../../dist/vue-ssr-client-manifest.json'),
      cache: LRU({
        max: 1000,
        maxAge: 1000, // 1s
      })
    },
  )
  console.log('`renderer` changed \n\r\n\r')
}

const watcher = chokidar.watch([
  resolve('../../dist/vue-ssr-server-bundle.json'),
  resolve('../../dist/vue-ssr-client-manifest.json'),
  resolve('./index.html'),
])

createRenderer()
watcher.on('change', createRenderer)

const port = process.env.PORT || 3000

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && 1000 * 60 * 60 * 24 * 30
})

App.use('/dist', serve(resolve('../../dist/js'), true))
App.use('/static', serve(resolve('../../dist/static'), true))

App.get('*', (req, res) => {
  const context = { url: req.url }
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  renderer.renderToString(context, (e, html) => {
    if (e) {
      if (e.code === 404) res.status(404).end('Page not found')
      else res.status(500).end('Internal Server Error')
    } else res.end(html)
  })
})

App.listen(port, e => {
  if (e) console.error(e)
  else console.log('==> Listening on port %s. Open up http://yourip:%s/ in your browser.', port, port)
})
