const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
})

const extractSass = new ExtractTextPlugin({
    filename: '[name].bundle.css',
    allChunks: true
})

module.exports = {
    entry: ['./src/js/index.js', './src/sass/main.scss'],
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(sass|scss)$/,
                loader: process.env.NODE_ENV == 'development' ? ExtractTextPlugin.extract('css-loader!sass-loader') : 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        extractSass
    ],
    resolve: {
        modules: [
            'src/js',
            'node_modules'
        ]
    }
}