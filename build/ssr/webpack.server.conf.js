'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const baseConfig = require('./webpack.base.conf.js')
const config = require('../../config/index')

module.exports = merge(baseConfig, {
  // server entry
  entry: {
    app: ['./src/entry-server.js'],
  },
  // This allows webpack to handle dynamic import in a node-appropriate fashion,
  // And told `vue-loader` conveying for server code(server-oriented code)
  // when compiling the Vue component.
  target: 'node',
  // Source map support for bundle renderer
  devtool: 'source-map',
  // Node-style exports
  output: {
    libraryTarget: 'commonjs2',
  },
  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // Externalize application dependency modules
  // to make server build faster and generate a smaller bundle file.
  externals: nodeExternals({
    // whitelist
    // You can add more file types here.For example, the raw file *.vue is not processed,
    // You should also modify `global` (such as polyfill) depends on the module is included in the white list
    whitelist: /\.(css|vue)$/,
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"',
    }),
    // Generate `vue-ssr-server-bundle.json`
    // This is a plugin that builds the entire output of the server into a single JSON file.
    new VueSSRServerPlugin({ filename: config.server.serverBundle }),
  ],
})
