'use strict'
const config = require('../config')
const HappyPack = require('happypack')
const utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf')

const plugins = { css: [], js: [], vue: [] }

const createHappyPack = (() => {
  const threadPool = HappyPack.ThreadPool({ size: 4 })
  return (id, loaders) => ({
    plugin: new HappyPack({
      id,
      threadPool,
      loaders,
      verbose: false,
    }),
    loaders: [`happypack/loader?id=${id}`],
  })
})()

function loadersDeal(id, loaders) {
  if (utils.isProduction && utils.useHappypack) {
    const h = createHappyPack(id, loaders)
    if (id === 'js') {
      plugins[id] = [h.plugin]
    } else if (id === 'vue') {
      plugins[id] = [h.plugin]
    } else {
      plugins.css.push(h.plugin)
    }
    return h.loaders
  }
  return loaders
}

const vueLoader = (id, loaders) => () => {
  return {
    test: /\.vue$/,
    loader: loadersDeal(id, loaders),
    include: utils.pathResolve('src'),
  }
}

const jsLoader = (id, loaders) => () => ({
  test: /\.js$/,
  loader: loadersDeal(id, loaders),
  include: [
    utils.pathResolve('src'),
    utils.pathResolve('test'),
    utils.pathResolve('node_modules/webpack-dev-server/client'),
  ],
})

const cssLoader = (extension, loaders) => () => ({
  test: new RegExp('\\.' + extension + '$'),
  loader: loadersDeal(extension, loaders),
  include: utils.pathResolve('src/css'),
})

const cssLoaders = utils.cssLoaders(utils.isProduction ? {
  sourceMap: config.build.productionSourceMap,
  usePostCSS: true,
  extract: !utils.isServer,
} : {
  sourceMap: config.dev.cssSourceMap,
  usePostCSS: true,
})

const loaders = {
  ...cssLoaders,
  js: ['babel-loader?cacheDirectory=true'],
  vue: [{ loader: 'vue-loader', options: vueLoaderConfig }],
}

const rules = Object.keys(loaders).reduce((pre, type) => {
  let loader = loaders[type]
  if (type === 'js') {
    pre[type] = jsLoader(type, loader)
  } else if (type === 'vue') {
    pre[type] = vueLoader(type, loader)
  } else {
    pre.css.push(cssLoader(type, loader))
  }
  return pre
}, { css: [] })

exports.rules = rules
exports.plugins = plugins
