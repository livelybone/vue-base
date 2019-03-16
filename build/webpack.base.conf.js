const webpack = require('webpack')
const utils = require('./utils')
const config = require('../config')
const happypackConf = require('./happypack')

const context = utils.pathResolve('')
const VueReference = new webpack.DllReferencePlugin({
  context,
  manifest: utils.pathResolve('/static/dll/VueReference-manifest.json'),
})

const UIAndUtils = new webpack.DllReferencePlugin({
  context,
  manifest: utils.pathResolve('/static/dll/UIAndUtils-manifest.json'),
})

module.exports = {
  context: utils.pathResolve(),
  entry: {
    app: ['./src/entry-client.js'],
  },
  output: {
    path: utils.pathResolve(config.build.assetsRoot),
    filename: '[name].js',
    publicPath: utils.isProduction
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
    chunkFilename: '[name].chunk.js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': utils.pathResolve('src'),
      'config': utils.pathResolve('config'),
    },
  },
  module: {
    rules: [
      happypackConf.rules.vue(),
      happypackConf.rules.js(),
      ...happypackConf.rules.css.map(rule => rule()),
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  plugins: [
    VueReference,
    UIAndUtils,
    ...happypackConf.plugins.vue,
    ...happypackConf.plugins.js,
    ...happypackConf.plugins.css,
  ],
}
