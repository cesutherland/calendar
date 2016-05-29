// Modules:
var path              = require('path');
var WebpackLiveReload = require('webpack-livereload-plugin');


// Webpack Config:
module.exports = {
  watch: true,
  devtool: 'eval-source-map',
  entry: {
    app: ["./src/index.js"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  plugins: [
    new WebpackLiveReload()
  ],
  module: {
    /*
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015']
        }
      }
    ]
    */
  }
};
