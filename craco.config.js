const webpack = require("webpack");

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          assert: false,
          // stream: false,
          crypto: false,
          // https: false,
          // http: false,
          path: false,
          os: false,
          zlib: false,
          fs: false,
          net: false,
          tls: false,
          // util: false,
          // assert: require.resolve("assert"),
          stream: require.resolve("stream-browserify"),
          // crypto: require.resolve("crypto-browserify"),
          https: require.resolve("https-browserify"),
          http: require.resolve("http-browserify"),
          // path: require.resolve("path-browserify"),
          // os: require.resolve("os-browserify"),
          // zlib: require.resolve("browserify-zlib"),
          // fs: require.resolve("browserify-fs"),
          // net: require.resolve("net-browserify"),
          // tls: require.resolve("tls-browserify"),
          util: require.resolve("util"),
          buffer: require.resolve("buffer"),
          process: require.resolve("process/browser"),
        },
      },
      plugins: [
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
          process: "process/browser",
        }),
      ],
    },
  },
};
