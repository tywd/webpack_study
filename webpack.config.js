const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin'); // 每次文件修改后，重新打包，导致 dist 目录下的文件越来越多。要是每次打包前，都会帮我们先清空一下目录
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];
console.log(config)
module.exports = {
    mode: isDev ? 'development' : 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'), //必须是绝对路径
        filename: 'bundle.[hash:6].js', // 考虑到CDN缓存的问题，我们一般会给文件名加上 hash.长度给6不会太长
        publicPath: '/' //通常是CDN地址
    },
    devServer: {
        port: '3000', //默认是8080
        quiet: false, //默认不启用 除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: "errors-only", //终端仅打印 error。 当启用了 quiet 或者是 noInfo 时，此属性不起作用。
        overlay: false, //默认不启用 当编译出错时，会在浏览器窗口全屏输出错误
        clientLogLevel: "silent", //日志等级
        compress: true //是否启用 gzip 压缩
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // 匹配规则，针对符合规则的文件进行处理
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    "corejs": 3
                                }
                            ]
                        ]
                    }
                },
                exclude: /node_modules/ //排除 node_modules 目录
            },
            {
                test: /\.(le|c|sc)ss$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader', // 为css添加浏览器前缀
                    options: {
                        plugins: function () {
                            return [
                                require('autoprefixer')() // 引入autoprefixer使其生效，
                                // 或者在根目录新建个postcss.config.js 配置
                                // module.exports = {
                                //     plugins: [require('autoprefixer')]  // 引用该插件即可了
                                // }
                            ]
                            /*  根目录下创建 .browserslistrc文件  将对应的规则写在此文件中，除了 autoprefixer 使用外，@babel/preset-env、stylelint、eslint-plugin-conmpat 等都可以共用。
                            require('autoprefixer')({
                                "overrideBrowserslist": [
                                    ">0.25%",
                                    "not dead"
                                ]
                            }) */
                        }
                    }
<<<<<<< HEAD
                }, 'less-loader', 'sass-loader'],
                // loader 的执行顺序是从右向左执行的，也就是后面的 loader 先执行
=======
                }, 'less-loader','sass-loader'], 
                // loader 的执行顺序是从右向左执行的，也就是后面的 loader 先执行，也可用enforce参数改变优先级
>>>>>>> 6a456a20d9080a4025db385d7962f9702cf31961
                exclude: /node_modules/
            },
            // {
            //     test: /.html$/, 
            //     use: 'html-withimg-loader' // 该属性可以配置使用本地图片 因为构建之后，通过相对路径压根找不着这张图片呀。
            // },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240, // 资源大小小于 10K 时，将资源转换为 base64，超过 10K，将图片拷贝到 dist 目录。
                        esModule: false, // esModule 设置为 false，否则，<img src={require('XXX.jpg')} /> 会出现 <img src=[Module Object] />
                        name: '[name]_[hash:6].[ext]', // 图片名称，也可不加name，默认自己给
                        outputPath: 'assets' // 将图片打包在一个文件夹下
                    }
                }],
                exclude: /node_modules/
            }
        ]
    },
    devtool: isDev ? 'cheap-module-eval-source-map' : ('source-map' || 'none'),
    plugins: [
        //数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html', //打包后的文件名
            config: config.template,
            minify: {
                removeAttributeQuotes: false, //是否删除属性的双引号
                collapseWhitespace: false, //是否折叠空白
            },
            // hash: true //是否加上hash，默认是 false
        }),
        // 不需要传参数，它可以找到 outputPath
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] //但希望不删除某个目录的文件也可，例：dll目录下的文件
        })
    ]
}