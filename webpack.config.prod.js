const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';
const path = require('path');

module.exports = {
  mode:  process.env.NODE_ENV,
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
            isDevelopment 
            ? MiniCssExtractPlugin.loader
            : { loader: 'style-loader', options: { sourceMap: true} },
            { loader: 'css-loader', options: {sourceMap: isDevelopment } },
            { loader: 'postcss-loader', options: { soruceMap: isDevelopment} },
            { loader: 'sass-loader', options: { sourceMap: isDevelopment } },
        ],
    }
],
},
  plugins: [new HtmlWebpackPlugin(),
  
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
  })],
};