'use strict';
require('../check-versions')();

process.env.NODE_ENV = 'production';
process.env.VUE_ENV = 'server';

const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../../config/index');
const webpackConfig = require('./webpack.client.conf');
const webpackServerConfig = require('./webpack.server.conf');

const spinner = ora('server building for production...');
spinner.start();

rm(path.join(config.build.assetsRoot, '..'), err => {
  if (err) throw err;
  const task = [];
  task.push(new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      spinner.stop();
      if (err) reject(err);
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      }) + '\n\n');

      if (stats.hasErrors()) {
        console.log(chalk.red('  Client build failed with errors.\n'));
        process.exit(1)
      }

      console.log(chalk.cyan('  Client build complete.\n'));
      resolve();
    })
  }));

  task.push(new Promise((resolve, reject) => {
    webpack(webpackServerConfig, (err, stats) => {
      spinner.stop();
      if (err) reject(err);
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
        chunks: false,
        chunkModules: false
      }) + '\n\n');

      if (stats.hasErrors()) {
        console.log(chalk.red('  Server build failed with errors.\n'));
        process.exit(1)
      }

      console.log(chalk.cyan('  Server build complete.\n'));
      resolve();
    })
  }));

  Promise.all(task).then(() => {
    console.log(chalk.cyan('  All build complete.\n'));
  })
});
