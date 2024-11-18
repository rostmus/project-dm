const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const min = isProd ? '.min' : '';

const cssLoaders = (value) => {
    const loaders = [
        MiniCssExtractPlugin.loader,
        'css-loader',
    ];

    if (value) {
        loaders.push(value);
    }

    return loaders;
}

const pluginLoaders = () => {
    const plugins = [

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            minify: false,
        }),
        new HtmlWebpackPlugin({
            filename: '404.html',
            template: '404.html',
            minify: false,
        }),
        // new CopyPlugin({
        //     patterns: [{
        //         context: 'public',
        //         from: '**/*',
        //     }],
        // }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: [
                '**/*.LICENSE.txt',
                '**/vendor.min.js.map'
            ],
            protectWebpackAssets: false
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
    ];

    return plugins;
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: "none",
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[contenthash].js'
    },
    devtool: 'source-map',
    plugins: [
        ...pluginLoaders()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: {
        minimize: true,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders('sass-loader')
            }
        ]
    },

    devServer: {
        port: '3001'
    }
};
