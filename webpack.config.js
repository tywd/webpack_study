/*
 * @Author: shichuyu
 * @Date: 2020-03-12 10:49:42
 * @LastEditors: shichuyu
 * @LastEditTime: 2020-03-16 18:25:56
 * @Description: 
 */
/* 
查看页面，难免就需要 html 文件，有小伙伴可能知道，有时我们会指定打包文件中带有 hash，那么每次生成的 js 文件名会有所不同，总不能让我们每次都人工去修改 html，这样不是显得我们很蠢嘛~
我们可以使用 html-webpack-plugin 插件来帮助我们完成这些事情。
*/
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const isDev = process.env.NODE_ENV === 'development';
const config = require('./public/config')[isDev ? 'dev' : 'build'];
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 以前，clean-webpack-plugin 是默认导出的，现在不是，所以引用的时候，需要注意一下。另外，现在构造函数接受的参数是一个对象，可缺省。
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 将单个文件或整个目录复制到构建目录
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 抽离CSS
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin'); // 将抽离出来的css文件进行压缩
module.exports = {
  entry: './src/index.js', //webpack的默认配置
  /* entry: [ // 为数组时，表示有“多个主入口”，想要多个依赖文件一起注入时，会这样配置
    './src/polyfills.js', // polyfills.js 文件中可能只是简单的引入了一些 polyfill
    './src/index.js'
  ], */
  output: {
    path: path.resolve(__dirname, 'dist'), // 必须是绝对路径
    filename: 'bundle.[hash:6].js',  // 考虑到CDN缓存的问题，我们一般会给文件名加上 hash. hash 可以指定长度
    publicPath: '/' // 通常是CDN地址
  },
  mode: isDev ? 'development' : 'production', // mode 配置项，告知 webpack 使用相应模式的内置优化
  /* 
  * development：将 process.env.NODE_ENV 的值设置为 development，启用 NamedChunksPlugin 和 NamedModulesPlugin
  * production：将 process.env.NODE_ENV 的值设置为 production，启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin
  */
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // use: ['babel-loader'],
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
        test: /\.(le|c)ss$/,
        use: [
        MiniCssExtractPlugin.loader, // 替换之前的 style-loader
        'css-loader',{
          loader: 'postcss-loader',
          options: {
            plugins: function(){
              return [
                require('autoprefixer')()
              ]
            }
          }
      },'less-loader'],
      exclude: /mode_modules/
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,// 10K 资源大小小于 10K 时，将资源转换为 base64，超过 10K，将图片拷贝到 dist 目录
              esModule: false, // esModule 设置为 false，否则，<img src={require('XXX.jpg')} /> 会出现 <img src=[Module Object] />
              name: '[name]_[hash:6].[ext]', // 默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名
              outPath: 'assets', // 当本地资源较多时，我们有时会希望它们能打包在一个文件夹下
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // 数组 放着所有的webpack插件
    /* new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html', // 打包后的文件名
      minify: {
        removeAttributeQuotes: false, // 是否删除属性的双引号
        collapseWhitespace: false, // 是否折叠空白
      },
      // hash: true, // 是否江上hash，默认是false
    }) */
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html', //打包后的文件名
      config: config.template
    }),
    //不需要传参数喔，它可以找到 outputPath
    new CleanWebpackPlugin(
      {
        cleanOnceBeforeBuildPatterns:['**/*', '!dll', '!dll/**'] //不删除dll目录下的文件
      }
    ),
    new CopyWebpackPlugin([
      {
        from: 'public/js/*.js',
        to: path.resolve(__dirname, 'dist', 'js'),
        flatten: true,
      },
      // 还可以继续配置其它要拷贝的文件
    ], {
      ignore: ['other.js'] // 忽略掉 js 目录下的 other.js 文件，使用 npm run build 构建，可以看到 dist/js 下不会出现 other.js 文件
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css' // 习惯将css文件放在单独目录下
    }),
    new OptimizeCssPlugin()
  ],
  devServer: {
    port: '3000', // 默认是8080
    quiet: false, // 默认不启用
    inline: true, // 默认开启 inline 模式，如果设置为false,开启 iframe 模式
    stats: 'errors-only', // 终端仅打印error
    overlay: false, // 默认不启用
    clientLogLevel: 'silent', // 日志等级
    compress: true // 是否启用 gzip 压缩
  },
  devtool: 'cheap-module-eval-source-map' // 开发环境下使用
}