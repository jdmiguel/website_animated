const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const MODE_ENV = process.env.MODE;

module.exports = {
  devtool: 'source-map',

  mode: 'development',

  name: 'webpack_config',

  context: path.resolve(__dirname, 'src'),

  entry: {
    vendor: [
      './vendor/Hammer.min.js',
      './vendor/gsap/TweenMax.min.js',
      './vendor/gsap/utils/SplitText.min.js',
      './vendor/gsap/plugins/DrawSVGPlugin.js'
    ],
    app: './index.js'
  },

  devServer: {
    port: 9000,
    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff|png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: {
                  removeViewBox: false
                }
              }
            }
          },
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'justice_league',
      template: '../assets/template-app.ejs',
      filename: 'index.html',
      hash: true
    }),

    new MiniCssExtractPlugin({
      filename: '[name]-styles.css'
    })
  ]
};
