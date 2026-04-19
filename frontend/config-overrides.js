const path = require('path');

module.exports = function override(config, env) {
  // Add fallbacks for Node.js core modules that axios needs
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "util": require.resolve("util/"),
    "zlib": require.resolve("browserify-zlib"),
    "stream": require.resolve("stream-browserify"),
    "url": require.resolve("url/"),
    "crypto": require.resolve("crypto-browserify"),
    "assert": require.resolve("assert/"),
    "http2": false, // Disable http2 as it's not needed for axios in browser
  };

  return config;
};