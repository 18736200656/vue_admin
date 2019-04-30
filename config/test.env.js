'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"test"',
  NODE_BASE_URL:'https://mx.atpiao.net/api/v9/test/wbz_pc/'
})
