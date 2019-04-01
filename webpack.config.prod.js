const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProduction = process.env.NODE_ENV === 'production';
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
          isProduction 
            ? MiniCssExtractPlugin.loader
            : { loader: 'style-loader', options: { sourceMap: true} },
            { loader: 'css-loader', options: {sourceMap: isProduction } },
            { loader: 'postcss-loader', options: { soruceMap: isProduction} },
            { loader: 'sass-loader', options: { sourceMap: isProduction } },
        ],
    }
],
},
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  }),
  
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
  })],
};