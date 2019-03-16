'use strict'
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const config = require('../config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const utils = require('./utils')

const dlls = {
  VueReference: [
    'babel-polyfill',
    'vue',
    'vuex',
    'vue-router',
    'vue-i18n',
    'vue-meta',
    'axios',
  ],
  UIAndUtils: [
    '@livelybone/rem-init',
    '@livelybone/simple-observer',
    '@livelybone/storage',
    '@livelybone/vue-button',
    '@livelybone/vue-input',
    '@livelybone/vue-loading',
    '@livelybone/vue-pagination',
    'vue-img-tag',
    'vue-slide-for-more',
    'vuejs-snackbar',
  ],
}

module.exports = {
  mode: 'production',
  entry: dlls,
  output: {
    path: utils.pathResolve('static'),
    filename: `dll/[name]-[chunkhash].dll.js`,
    publicPath: '<%= htmlWebpackPlugin.options.assetsPublicPath %>/<%= htmlWebpackPlugin.options.assetsSubDirectory %>',
    library: '[name]',
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
          },
        },
        sourceMap: config.build.productionSourceMap,
        parallel: true,
        cache: true,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: utils.pathResolve('/static/index.html'),
      template: 'index.html',
      inject: 'head',
      minify: false,
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new webpack.DllPlugin({
      path: utils.pathResolve('/static/dll/[name]-manifest.json'),
      name: '[name]',
      context: utils.pathResolve('/'),
    })
  ]
}
