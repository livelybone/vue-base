const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack')

class BuildFn {
  constructor() {
    this.time = Date.now()
    this.ora = ora
    this.spinner = ora()
    this.spinner.start('building for production...')

    this.compiledItems = {}
  }

  printCompiledArr() {
    this.spinner.stop()
    console.log(chalk.yellow(`\n  Compile results:`))
    Object.keys(this.compiledItems).forEach((key) => {
      const res = this.compiledItems[key]
      if (res === true) console.log(chalk.cyan(`  -- ${key}: build succeeded.`))
      else if (res instanceof Error) {
        console.log(chalk.red(`  -- ${key}: build failed.`))
        console.log(chalk.red(`     Reason(${res.type || res.name || 'Error'}): ${res.message}`))
      }
      else console.log(chalk.yellow(`  -- ${key}: build not started.`))
    })
    console.log(`\n  All built in ${((Date.now() - this.time) / 1000).toFixed(2)}s\n`)
  }

  wpCallback(key, rej, res) {
    return (err, stats) => {
      console.log('\n')
      if (stats) {
        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
          chunks: false,
          chunkModules: false,
        }) + '\n\n')
      }

      if (err || (stats && stats.hasErrors())) {
        console.log(chalk.red(`  ${key}: build Interrupted`))
        this.compiledItems[key] = err || new Error(`build failed with errors.`)
        rej()
      } else {
        console.log(chalk.cyan(`  ${key}: build complete.\n`))
        this.compiledItems[key] = true
        res()
      }
    }
  }

  chunkDeal(key, webpackConfig) {
    return new Promise((res, rej) => {
      this.compiledItems[key] = false
      webpack(webpackConfig, this.wpCallback(key, rej, res))
    })
  }
}

module.exports = new BuildFn()
