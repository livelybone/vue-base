'use strict';
const path = require('path');

const routes = [ // 在这里编辑需要预渲染的页面的路由
  {path: '/', title: 'Home'},
  {path: '/not-found', title: 'NotFound'},
];

const titles = {};

routes.map(route => titles[path] = route.title);

module.exports = {
  // For more: https://github.com/chrisvfritz/prerender-spa-plugin/tree/v3
  // Required - The path to the webpack-outputted app to prerender.
  staticDir: path.join(__dirname, '../dist'),
  // Required - Routes to render.
  routes: routes.map(route => route.path),
  postProcess(renderedRoute) {
    // Ignore any redirects.
    renderedRoute.route = renderedRoute.originalRoute;
    renderedRoute.html = renderedRoute.html.replace(/<title>[^<]*<\/title>/i, '<title>' + titles[renderedRoute.route] + '</title>');
    return renderedRoute
  },
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

