'use strict'
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const config = require('../../config/index')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const utils = require('../utils')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = merge(baseConfig, {
  entry: {
    app: ['./src/entry-client.js'],
  },
  plugins: [
    new ManifestPlugin({
      fileName: utils.assetsPath('manifest.json'),
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: utils.pathResolve('static/dll'),
        to: utils.pathResolve(config.build.assetsRoot, config.build.assetsSubDirectory, 'dll'),
        ignore: ['.*'],
      },
    ]),
    // Generate `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin({ filename: config.server.clientManifest }),
  ],
})
