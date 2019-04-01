'use strict'
const fs = require('fs')
const config = require('../../config/index')
const utils = require('../utils')
const dllConfig = require('../webpack.dll.conf')

exports.readFile = function (...args) {
  return fs.readFileSync(utils.pathResolve(...args), 'utf-8')
}

exports.rewriteClientManifest = function () {
  const dllNames = Object.keys(dllConfig.entry)
  const clientManifest = JSON.parse(exports.readFile('dist', config.server.clientManifest))
  const dllJs = []
  const reg = new RegExp(`(^|\/|\\\\+)(${dllNames.reduce((pre, name) => (pre ? `${pre}|${name}` : name), '')})`)
  clientManifest.async = clientManifest.async.filter(fileName => {
    if (reg.test(fileName)) {
      dllJs.push(fileName)
      return false
    }
    return true
  })
  clientManifest.initial.unshift(...dllJs)
  fs.writeFileSync(utils.pathResolve('dist', config.server.clientManifest), JSON.stringify(clientManifest), { encoding: 'utf-8' })
}

exports.pingFile = function (path, next) {
  if (fs.existsSync(path)) {
    next()
    return true
  }
}

exports.untilFileExist = function (path) {
  return new Promise(res => {
    if (!exports.pingFile(path, res)) {
      const timer = setInterval(() => {
        if (exports.pingFile(path, res)) clearInterval(timer)
      }, 1000)
    }
  })
}
