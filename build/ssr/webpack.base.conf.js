'use strict'
const webpack = require('webpack')
const config = require('../../config/index')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const env = require('../../config/prod.env')
const happypackConf = require('../happypack')
const utils = require('../utils')

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
  mode: 'production',
  context: utils.pathResolve(''),
  devtool: false,
  output: {
    path: utils.pathResolve(config.build.assetsRoot),
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    publicPath: config.build.assetsPublicPath,
    chunkFilename: utils.assetsPath('js/[name]-[chunkhash].chunk.js'),
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
  optimization: {
    // Use when multiple entries exist
    // runtimeChunk: {
    //   name: 'manifest'
    // },
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
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different pages can be deduped.
      new OptimizeCSSPlugin({
        cssProcessorOptions: config.build.productionSourceMap
          ? { safe: true, map: { inline: false } }
          : { safe: true },
      }),
    ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/,
        },
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env,
    }),
    // extract css into its own file
    // new MiniCssExtractPlugin({
    //   filename: utils.assetsPath('css/[name].[contenthash].css'),
    //   chunkFilename: utils.assetsPath('css/[name]-[contenthash].chunk.css'),
    // }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    VueReference,
    UIAndUtils,
    ...happypackConf.plugins.vue,
    ...happypackConf.plugins.js,
    ...happypackConf.plugins.css,
  ],
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
}
