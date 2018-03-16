'use strict';
const Vue = require('vue');
const App = require('express')();
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.html', 'utf-8')
});
const port = 3000;

App.get('*', (req, res) => {
  const app = new Vue({
    data: {url: req.url},
    template: '<div>正在访问：{{url}}</div>'
  });

  renderer.renderToString(app, (e, html) => {
    console.log(html);
    if (e) {
      res.status(500).end('Internal Server Error');
      return
    }

    res.end(html)
  })
});

App.listen(port, e => {
  if (e) console.error(e);
  else console.log("==> Listening on port %s. Open up http://yourip:%s/ in your browser.", port, port)
});
