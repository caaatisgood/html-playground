/* global __dirname */

var path = require('path')
var webpack = require('webpack')
var DIR_JS = path.resolve(__dirname, 'src')
var DIR_STATIC = path.resolve(__dirname, 'static')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    js: path.resolve(DIR_JS, 'index.js')
  },
  output: {
    path: DIR_STATIC,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  stats: {
    colors: true
  },
  devServer: {
    contentBase: DIR_STATIC,
    hot: true
  }
}
