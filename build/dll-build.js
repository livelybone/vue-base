'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const rm = require('rimraf')
const chalk = require('chalk')
const utils = require('./utils')
const buildUtil = require('./build-util')
const dllWebpackConfig = require('./webpack.dll.conf')

rm(utils.pathResolve('static/dll'), err => {
  if (err) throw err

  buildUtil.spinner.start('Dll: start building ...')
  buildUtil.chunkDeal('Dll', dllWebpackConfig)
    .then(() => {
      buildUtil.printCompiledArr()
      console.log(chalk.yellow(
        '  Tip: Now, you can use the dll file via DllReferencePlugin\n',
      ))
    })
    .catch((err) => {
      buildUtil.printCompiledArr()
      if (err) console.log(chalk.red(`${err.type || err.name || 'Error'}: ${err.message}`))
      process.exit(1)
    })
})
