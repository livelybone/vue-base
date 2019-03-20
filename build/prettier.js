'use strict'
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const klaw = require('klaw')
const spawn = require('cross-spawn')
const prettier = require('prettier')
const config = require('../.prettierrc')
const utils = require('./utils')

const cmd = utils.pathResolve()

function cssPrettier(file, parser = '') {
  const reg = /\.(scss|css|less|sass|pcss)$/
  if (reg.test(file)) {
    return new Promise((res, rej) => {
      fs.readFile(
        file,
        { encoding: 'utf-8' },
        (err, str) => {
          if (err) rej(err)
          else res(str)
        },
      )
    }).then((str) => new Promise((res, rej) => {
      fs.writeFile(
        file,
        prettier.format(str, {
          ...config,
          parser: parser || 'css'
        }),
        { encoding: 'utf-8' },
        err => {
          if (err) rej(err)
          else res(str)
        },
      )
    })).then(() => {
      console.log(chalk.green(`Formatted: ${file.replace(cmd, '.').replace(new RegExp(`\\${path.sep}`, 'g'), '/')}`))
    }).catch(err => {
      console.log(chalk.red(err))
      process.exit(1)
    })
  }
  return Promise.resolve()
}

let start = Date.now()

/**
 * JS/Vue
 * */
console.log(chalk.cyan('JS/Vue prettier start...'))
spawn.sync('eslint', ['.', '--ext', '.js,.vue', '--fix'], { cmd, stdio: 'inherit' })
console.log(chalk.cyan(`JS/Vue prettier end in ${Date.now() - start}ms\n`))

start = Date.now()

/**
 * CSS
 * */
console.log(chalk.cyan('CSS prettier start...\n'))
let pro = []
klaw('./src')
  .on('data', item => {
    if (!item.stats.isDirectory()) {
      pro.push(cssPrettier(item.path))
    }
  })
  .on('error', err => {
    console.log(chalk.red(err))
    process.exit(1)
  })
  .on('end', () => Promise.all(pro).then(() => {
    console.log(chalk.cyan(`\nCSS prettier end in ${Date.now() - start}ms`))
  }))
