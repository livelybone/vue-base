'use strict'
const path = require('path')

// 在这里编辑需要预渲染的页面的路由
const rs = ['/']
const routes = ['en', 'zh-hans', 'zh-hant']
  .reduce((pre, lang) => pre.concat(rs.map(r => ({ path: `/${lang}${r}` }))), [])

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
