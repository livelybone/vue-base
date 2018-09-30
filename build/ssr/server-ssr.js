'use strict'
const express = require('express')
const App = express()
const path = require('path')
const resolve = file => path.resolve(__dirname, file)
const serverBundle = require('../../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../../dist/vue-ssr-client-manifest.json')
const LRU = require('lru-cache')
const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
  runInNewContext: 'once',
  template: require('fs').readFileSync('./index.html', 'utf-8'),
  clientManifest,
  cache: LRU({
    max: 1000,
    maxAge: 1000, // 1s
  })
})
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
