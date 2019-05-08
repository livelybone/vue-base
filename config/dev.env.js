'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const { dev: { backendUrl } } = require('./index')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BACKEND_URL: JSON.stringify(backendUrl),
})
