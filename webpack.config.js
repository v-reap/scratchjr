var WebpackNotifierPlugin = require('webpack-notifier');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        'app': './src/entry/app.js'
    },
    output: {
        path: __dirname + '/editions/free/src/js',
        filename: '[name].bundle.js?[hash:8]'
    },
    performance: {
        hints: false
    },
    watchOptions: {
        ignored: ["node_modules", "src/build/**/*"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: /node_modules/,
                loaders: ['strip-sourcemap-loader']
            },
            {
                loader: 'babel-loader',
                exclude: /node_modules/,
                test: /\.jsx?$/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['editions/free/src/js']),
        new HtmlWebpackPlugin({
            chunks:'app',
            filename:__dirname + '/editions/free/src/editor.html',
            template:'./src/entry/editor.html'  
        }),
        new WebpackNotifierPlugin({
            title: "ScratchJr",
            alwaysNotify: true
        })
    ]
};
