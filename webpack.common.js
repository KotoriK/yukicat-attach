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
                            "@babel/preset-env"
                        ],
                        plugins: ["@emotion"]
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
            {
                test: /\.m?js$/,
                include: /node_modules/
            }
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