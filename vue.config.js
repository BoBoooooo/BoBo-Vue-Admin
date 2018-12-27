/* eslint-disable prefer-destructuring */
/*
 * @Author: BoBo
 * @Date: 2018-12-23 10:59:19
 * @Last Modified by: BoBo
 * @Last Modified time: 2018-12-24 18:03:16
 */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  // 项目部署的基础路径
  // 我们默认假设你的应用将会部署在域名的根部，
  // 比如 https://www.my-app.com/
  // 如果你的应用时部署在一个子路径下，那么你需要在这里
  // 指定子路径。比如，如果你的应用部署在
  // https://www.foobar.com/my-app/
  // 那么将这个值改为 `/my-app/`
  baseUrl: './',

  // 将构建好的文件输出到哪里
  outputDir: 'dist',

  // 放置静态资源的地方 (js/css/img/font/...)
  // assetsDir: '',

  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: true,
  productionSourceMap: false,

  chainWebpack: (config) => {
    config.module.rule('svg').exclude.add(resolve('src/icons'));
    config.module
      .rule('svg-sprite-loader')
      .test(/.svg$/)
      .include.add(resolve('src/icons')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
  },

  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: true,

    // 是否开启 CSS source map？
    sourceMap: false,

    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {},

    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    modules: false,
  },
  // 配置 webpack-dev-server 行为。
  devServer: {
    open: process.platform === 'bobo',
    host: '127.0.0.1',
    port: 8088,
    hot: true,
    hotOnly: true,
    disableHostCheck: true, // 坑！！ 不加会无限提示 热更新 websocket连接失败

    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
    proxy: {
      '/weather': {
        target: 'https://www.sojson.com/open/api/weather/json.shtml?city=南京',
        changeOrigin: true,
        pathRewrite: {
          '^/weather': '',
        },
      },
      '/douban': {
        target: 'https://api.douban.com/v2', // 设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/douban': '', // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        },
      },
      '/report': {
        target: 'https://news-at.zhihu.com/api/4/news', // 设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/report': '', // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        },
      },

      '/music': {
        target: 'http://music.163.com/api/playlist/detail', // 设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/music': '', // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        },
      },
      '/Chat': {
        target: 'http://www.tuling123.com/openapi/api', // 设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/Chat': '', // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
        },
      },


    },
  },

  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      if (process.env.npm_lifecycle_event === 'analyze') {
        config.plugins.push(
          new BundleAnalyzerPlugin(),
        );
      }
    } else {
      // 为开发环境修改配置...

    }
  },

  // 第三方插件的选项
  pluginOptions: {

  },
}
