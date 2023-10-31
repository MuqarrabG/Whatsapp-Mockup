const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const webpack = require('webpack');

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  console.log("React app rewired works!")
  //config.plugins.push(new NodePolyfillPlugin())
  config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      fs: false,
      // url: false,
      // assert: false,
      // path: false,
      // http: false,
      // zlib: false,
      // querystring: false,
      // crypto: false,
      // util: false,
      // stream: false,
      // buffer: false
    }
  return config
}