'use strict'
require('../check-versions')()

process.env.NODE_ENV = 'production'
process.env.VUE_ENV = 'server'

const rm = require('rimraf')
const chalk = require('chalk')
const config = require('../../config/index')
const webpackConfig = require('./webpack.client.conf')
const webpackServerConfig = require('./webpack.server.conf')
const buildUtil = require('../build-util')
const utils = require('../utils')
const ssrUtils = require('./ssr-utils')

rm(utils.pathResolve(config.build.assetsRoot), err => {
  if (err) throw err

  buildUtil.spinner.start('Client: start building ...')
  buildUtil.chunkDeal('Client', webpackConfig)
    .then(() => {
      ssrUtils.rewriteClientManifest()
      buildUtil.spinner.start('Server: start building ...')
      return buildUtil.chunkDeal('Server', webpackServerConfig)
    })
    .then(() => {
      buildUtil.printCompiledArr()
      console.log(chalk.cyan('  Server build complete.\n'))
    })
    .catch((err) => {
      buildUtil.printCompiledArr()
      if (err) console.log(chalk.red(`${err.type || err.name || 'Error'}: ${err.message}`))
      process.exit(1)
    })
})
