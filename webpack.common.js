const path = require('path');
const webpack = require('webpack')
module.exports = {
    //入口点
    entry: {
        post: './src/post.ts',
    },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js', module: false
    },// Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    target: "web",
    module: {
        //处理规则
        rules: [
            {
                test: /\.tsx?$/,

                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env", ["@babel/preset-react", {
                                "runtime": "automatic"
                            }]

                        ], plugins: [[
                            'transform-react-remove-prop-types',
                            {
                                mode: 'remove', removeImport: true
                            },
                        ],]
                    }
                },
                {
                    loader: "ts-loader",
                    options: {
                        allowTsInNodeModules: true
                    }
                }
                ]
            },

            //组件的静态资源
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'   // 路径
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'   // 路径
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        // 提出公共模块
        /*  new webpack.optimize.CommonsChunkPlugin({
               name: 'React',   // 公共模块名
               filename: 'react.js'  // 打包的目录
           })  */
    ]
};