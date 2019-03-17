'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const config = require('../../config/index')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const utils = require('../utils')

module.exports = merge(baseConfig, {
  entry: {
    app: ['./src/entry-client.js'],
  },
  plugins: [
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: utils.pathResolve('static'),
        to: utils.pathResolve(config.build.assetsRoot, config.build.assetsSubDirectory),
        ignore: ['.*'],
      },
    ]),
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin({ filename: './vue-ssr-client-manifest.json' }),
  ],
})
