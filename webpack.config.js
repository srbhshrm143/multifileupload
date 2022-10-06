const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackRequireFrom = require('webpack-require-from');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

const prod = process.env.NODE_ENV === 'production';

const config = {
  entry: {
    app: './src/js/app',
    admin: './src/js/admin'
  },
  output: {
    filename: 'js/[name].js?v=[chunkhash:5]',
    chunkFilename: 'js/[name].js?v=[chunkhash:5]',
    path: path.resolve('app/assets'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'esbuild-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } },
          'postcss-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: prod,
    minimizer: [
      new ESBuildMinifyPlugin({
        css: true
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css?v=[chunkhash:5]',
    }),
    new WebpackRequireFrom({
      variableName: 'window.cdnUrl',
    }),
  ],
  mode: prod ? 'production' : 'development',
  stats: prod ? 'normal' : 'minimal',
  bail: prod,
  performance: { hints: false }
};

module.exports = config;
