'use strict'
const express = require('express')
const cookieParser = require('cookie-parser')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const LRU = require('lru-cache')
const serverRenderer = require('vue-server-renderer')
const chokidar = require('chokidar')
const utils = require('../utils')
const ssrUtils = require('./ssr-utils')
const config = require('../../config/index')
const customConfig = require('../../config/config')

const port = process.env.PORT || 3000

const serve = (path, cache) => express.static(utils.pathResolve(path), {
  maxAge: cache && 1000 * 60 * 60 * 24 * 30,
})

const filesNeeded = [
  utils.pathResolve('dist', config.server.serverBundle),
  utils.pathResolve('dist', config.server.clientManifest),
  utils.pathResolve('index-ssr.template'),
]

const readyFiles = new Set()

let renderer

function createRenderer() {
  const allReady = filesNeeded.every(filename => readyFiles.has(filename))
  if (allReady) {
    renderer = serverRenderer.createBundleRenderer(
      JSON.parse(ssrUtils.readFile('dist', config.server.serverBundle)),
      {
        runInNewContext: 'once',
        template: ssrUtils.readFile('index-ssr.template').replace(/[\n\r]/g, ''),
        clientManifest: JSON.parse(ssrUtils.readFile('dist', config.server.clientManifest)),
        cache: LRU({
          max: 1000,
          maxAge: 1000, // 1s
        }),
      },
    )
  } else {
    renderer = null
  }
}

function watchResource() {
  const watcher = chokidar.watch(filesNeeded)

  const handler = (type = 'changed') => filename => {
    console.log(
      chalk[type === 'changed' ? 'green' : 'cyan'](`-- File ${type}:`),
      filename.split(path.sep).pop(),
    )
    readyFiles.add(filename)
    createRenderer()
  }
  watcher
    .on('add', handler('ready'))
    .on('change', handler('changed'))
    .on('unlink', filename => {
      readyFiles.delete(filename)
      console.log(
        chalk.red(`-- File deleted:`),
        filename.split(path.sep).pop(),
      )
      ssrUtils.untilFileExist(filename)
        .then(() => {
          watcher.add(filename)
        })
    })
}

function getLang(req) {
  const {
    headers: { 'accept-language': acceptLanguage },
    cookies: { [customConfig.langKeyForStorage]: language = '' }
  } = req
  let lang = language
  if (!lang) {
    const existLangs = { 'zh': 'zh-hans', 'en': 'en' }
    const splitReg = /(,|;q=)/
    acceptLanguage
      .split(splitReg)
      .some(v => {
        return v && !splitReg.test(v) && Object
          .keys(existLangs)
          .some((k) => {
            if (v.toLowerCase().startsWith(k)) {
              lang = existLangs[k]
              return true
            }
          })
      })
  }
  return lang
}

function createApp() {
  const App = express()
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

  App.use(cookieParser())

  App.get('*', (req, res) => {
    const context = { url: req.url, lang: getLang(req) }
    // You don't need to pass in an application here
    // because the bundle is automatically created when you execute it.
    // Now our servers and applications are decoupled!
    if (renderer) {
      renderer.renderToString(context, (e, html) => {
        if (e) {
          console.log(chalk.red(e))
          if (e.code === 404) res.status(404).end('Page not found')
          else res.status(500).end('Internal Server Error')
        } else {
          res.end(html)
        }
      })
    } else {
      console.log(
        chalk.red('\n   Error: Files that needed for server render is not ready\n'),
      )
      res.status(500).end('Internal Server Error. The project may be in building')
    }
  })

  App.listen(port, e => {
    if (e) console.error(chalk.red(e))
    else {
      console.log(
        chalk.cyan(
          `==> Listening on port ${port}. Open up http://yourip:${port} in your browser.`
        ),
        '\n',
      )
    }
  })
}

watchResource()
createApp()
