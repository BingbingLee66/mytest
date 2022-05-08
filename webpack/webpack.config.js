//开发环境配置
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//设置node.js环境变量
process.env.NODE_ENV = 'production';
//css-minimizer-webpack-plugin 压缩css
//语法检查 eslint
// eslint-config-airbnb-base eslint-plugin-import
//tree shaking:去除无用代码
//开启ES6模块，开启production环境
//"sideEffects":false 都可进行tree shaking
//可能把css干掉改为["*.css"]
module.exports = {
    //webpack配置
    //多入口
    // entry: {
    //    index:'./src/index.js',
    //     test:'./src/test.js'
    // },
    entry:['./src/index.js'],
    output: {
        //取文件名
        filename: 'js/[name].[contenthash].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        //打包css
        rules: [
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: 'eslint-loader',
            //     options: {
            //         //自动修复
            //         fix: true
            //     }
            // },
            {
                //以下执行一次
            oneOf:[
                {
                    test:/\.js$/,
                    exclude:/node_modules/,
                    loader:"babel-loader"
                },
                {
                    test: /\.css$/,
                    use: [
                        //loader从右到左，下到上
                        //将js中的样式插入head
                        //取代style-loader,提取css
                        MiniCssExtractPlugin.loader,
                        //commjs模块加载js，字符串
                        'css-loader',
                        // css兼容性处理：postcss  postcss-loader postcss-preset-env
                        // 去package.json的browserslist
                        // "browserslist":{
                        //     "development":[
                        //       "last 1 chrome version",
                        //       "last 1 firefox version",
                        //       "last 1 safari version"
                        //     ],
                        //     "production":[
                        //       ">0.2%",
                        //       "not dead",
                        //       "not op_mini all"
                        //     ]
                        //   }
                        {
                            loader: 'postcss-loader',
                            options: {
                                publicPath:'../',
                                postcssOptions: {
                                    ident: "postcss",
                                    plugins: [
                                        //postcss插件
                                        [require('postcss-preset-env')]
                                    ]
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        //loader从右到左，下到上
                        //将js中的样式插入head
                        MiniCssExtractPlugin.loader,
                        //commjs模块加载js，字符串
                        'css-loader',
                        'less-loader'
                    ]
                },
                //处理图片资源
                {
                    test: /\.(jpg|png|gif)$/,
                    //下载 url-loader file-loader
                    type: 'asset',
                    loader: 'url-loader',
                    options:
                    {   //小于8kb会被处理
                      
                        limit: 4* 1024,
                        esModule: false,
                        filename: '[hash:10].[ext]',
                        outputPath: 'imgs',
                        // publicPath: '../'
                    }
                },
                // {
                //     test: /\.html$/,
                //     loader: 'html-loader',
                // },
                {
                    // 处理html文件中的img图片（负责引入img，从而能被url-loader进行处理）
                    test: /\.html$/,
                    loader: "html-loader",
                    options: {
                      esModule: false,
                    //   publicPath:'../',
                    }
                },
                //打包其他资源
                {
                    exclude: /\.(css|js|html|less|jpg|png|gif)$/,
                    loader: 'file-loader',
                    options:
                    {   //小于8kb会被处理
                        filename: '[hash:8].[ext]',
                        outputPath: 'media'
                    }
                }
    
            ]
            }
        ],//loader配置
    },
    plugins: [
        //html
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify:{
                //移除空格
                collapseWhitespace:true,
                //移除注释
                removeComments:true
            }
        }
        ),
        new MiniCssExtractPlugin({
            //重命名
            filename: 'css/built.[contenthash].css'
        }),
        //压缩css
        // new CssMinimizerWebpackPlugin()
    ],
    // 将node_modules单独打包一个chunk输出
    // optimization:{
    //     splitChunks:{
    //         chunks:'all'
    //     }
    // },
    mode: 'production',
    //开发服务器devServer 热更新
    target: "web",
    devServer: {
        static: { directory: resolve(__dirname, 'build') },
        compress: true,
        port: 3000,
        open: true,
        hot:true,
    },
    devtool:'source-map'
}
//source-map :提供构建后代代码映射技术
// inline-source-map:内联，内联构建速度快
//hidden-source-map:外联
//eval-source-map：每个文件生成内联