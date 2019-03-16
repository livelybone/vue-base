'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const rm = require('rimraf')
const utils = require('./utils')
const chalk = require('chalk')
const webpackConfig = require('./webpack.prod.conf')
const buildUtil = require('./build-util')
const config = require('../config')

rm(utils.pathResolve(config.build.assetsRoot), err => {
  if (err) throw err

  buildUtil.spinner.start('Main: start building ...')
  buildUtil.chunkDeal('Main', webpackConfig)
    .then(() => {
      buildUtil.printCompiledArr()
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n',
      ))
    })
    .catch((err) => {
      buildUtil.printCompiledArr()
      if (err) console.log(chalk.red(`${err.type || err.name || 'Error'}: ${err.message}`))
      process.exit(1)
    })
})
