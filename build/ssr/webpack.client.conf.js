'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const config = require('../../config/index');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const utils = require('../utils')

module.exports = merge(baseConfig, {
  entry: ['./src/entry-client.js'],
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: false,
    }),
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin({filename: '../vue-ssr-client-manifest.json'})
  ]
});
