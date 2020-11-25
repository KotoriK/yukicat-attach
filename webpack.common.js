const path = require('path');
const webpack = require('webpack')
module.exports = {
    //入口点
    entry: {
        post: './src/post.ts',
        pv: './src/pageview.tsx'
    },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js', module: false
    },// Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    }, 
    target: "browserslist",
    module: {
        //处理规则
        rules: [
            //Typescript
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            allowTsInNodeModules: true
                        }
                    }
                ]
            },/* {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
              }, */
            /*  {
                 test: /\.tsx?$/,
                 
                 use: [
                     {
                         loader: "babel-loader",
                         options:{
                             presets:[['@babel/preset-env'],
                             ['@babel/preset-typescript',{isTSX:true,allExtensions:true}],
                             ]
                         }
                     }
                 ]
             },  */

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
            }, {
                test: /\.html$/,
                use: ['html-loader']
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
    }, externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    plugins: [


        // 提出公共模块
        /*  new webpack.optimize.CommonsChunkPlugin({
               name: 'React',   // 公共模块名
               filename: 'react.js'  // 打包的目录
           })  */
    ]
};