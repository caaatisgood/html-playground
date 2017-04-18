/* global __dirname */

var path = require('path')
var webpack = require('webpack')
var dir_js = path.resolve(__dirname, 'src')
var dir_build = path.resolve(__dirname, 'build')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    js: path.resolve(dir_js, 'index.js')
  },
  output: {
    path: dir_build,
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
    new webpack.NoErrorsPlugin()
  ],
  stats: {
    colors: true
  },
  devServer: {
    contentBase: dir_build,
    hot: true
  }
}
