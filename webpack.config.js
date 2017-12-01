const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DIR_JS = path.resolve(__dirname, 'src')
const DIR_STATIC = path.resolve(__dirname, 'static')

let cssLoaderConfig
if (process.env.NODE_ENV === 'dev') {
  cssLoaderConfig = [
    'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        plugins: function () {
          return [
            require('precss'),
            require('autoprefixer')
          ]
        }
      }
    }
  ]
} else {
  cssLoaderConfig = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: function () {
            return [
              require('precss'),
              require('autoprefixer')
            ]
          }
        }
      }
    ]
  })
}

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
        use: cssLoaderConfig
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
    new ExtractTextPlugin('styles.css'),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  stats: {
    colors: true
  },
  devServer: {
    contentBase: DIR_STATIC,
    hot: true,
    historyApiFallback: true,
    inline: true,
  }
}
