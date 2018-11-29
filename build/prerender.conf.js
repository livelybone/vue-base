'use strict'
const path = require('path')

const routes = [ // 在这里编辑需要预渲染的页面的路由
  { path: '/' },
  { path: '/not-found' },
]

module.exports = {
  // For more: https://github.com/chrisvfritz/prerender-spa-plugin/tree/v3
  // Required - The path to the webpack-outputted app to prerender.
  staticDir: path.join(__dirname, '../dist'),
  // Required - Routes to render.
  routes: routes.map(route => route.path),
  minify: {
    collapseBooleanAttributes: true,
    collapseWhitespace: false,
    decodeEntities: true,
    keepClosingSlash: true,
    sortAttributes: true,
    trimCustomFragments: true,
    removeComments: true,
    removeEmptyAttributes: true,
  },
}
