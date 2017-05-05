const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DIR_JS = path.resolve(__dirname, 'src/hbs')
const DIR_STATIC = path.resolve(__dirname, 'static/hbs')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    js: path.resolve(DIR_JS, 'hbsIndex.js')
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
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'hbs-index.html',
      template: path.join(DIR_JS, 'hbs-index.html')
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
