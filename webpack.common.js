const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
   entry: './src/app.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js'
   },
   module: {
      rules: [{
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
         },
         {
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: 'file-loader',
            options: {
               name: './src/img/[name].[ext]'
            }
         },
         {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            use: [{
               loader: 'file-loader',
               options: {
                  name: '[name].[ext]',
                  outputPath: './src/font/'
               }
            }]
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.html',
         filename: 'index.html'
      }),
      new MiniCssExtractPlugin({
         filename: 'index.css'
      }),
      new CopyPlugin({
         patterns: [{
            from: 'src/script/icons.json',
            to: 'src/script/icons.json'
         }],
      })
   ]
}