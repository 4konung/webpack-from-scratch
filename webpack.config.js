const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const uniqueIdGenerator = require('./webpack-helpers');

const isDev = process.env.NODE_ENV === 'development';
const outputPath = path.join(__dirname, 'dist/');
const indexFile = path.join(__dirname, 'src/index.js');

module.exports = {
  target: 'web',
  devtool: isDev ? 'inline-source-map' : 'nosources-source-map',
  entry: {
    app: indexFile,
  },
  output: {
    path: outputPath,
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: { minimize: true },
        },
      },
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              sourceMap: isDev,
              ...(isDev
                ? { localIdentName: '[path]_[name]_[local]' }
                : {
                    getLocalIdent: (context, loacalIdentName, localName) =>
                      uniqueIdGenerator(localName, context.resourcePath),
                  }),
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...(isDev ? [] : [new CleanWebpackPlugin()]),
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html',
    }),
    ...(isDev
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[name].[contenthash].css',
          }),
        ]),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessor: cssnano,
        cssProcessorOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
    ],
  },
};
