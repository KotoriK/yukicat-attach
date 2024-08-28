const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin')
module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [
            new CssMinimizerPlugin({}),
            new TerserPlugin(
                {
                    test: /\.js$/, terserOptions: {
                        ecma: 2020,
                        module: true,
                        toplevel: true,
                        compress: {
                            passes: 2
                        }
                    }
                })
        ],
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 2,
        }
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
                    'css-loader',
                    'postcss-loader',
                    ,
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