const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//const MinifyPlugin = require("babel-minify-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin')
module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({}),
        new TerserPlugin(
            {
                test: /\.js$/, terserOptions: {
                    ecma: 2015,
                    module: true,
                    toplevel: true
                }
            })
        ],
        splitChunks: {
            chunks: 'async',
            minSize: 40000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            maxSize: 330000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                    minChunks: 2,
                    chunks: "all"
                },
                default: {
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    module: {
        rules: [
            //CSS
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, options: {
                            esModule: true,
                        }
                    },
                    'css-loader', 'sass-loader'
                    /*  'postcss-loader',
                     , */
                ],
            },
        ]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',

        }), /* new MinifyPlugin({keepFnName:false,keepClassName:false},
            {test:/\.js$/, exclude: /node_modules/,}) */
    ],
});