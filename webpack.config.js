const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
})

const environment = new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify('development')
    }
})

module.exports = {
    entry: ['./src/js/index.js'],
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
            }
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        environment
    ],
    resolve: {
        modules: [
            'src/js',
            'node_modules'
        ]
    }
}