/**
 * @file vue自定义配置，如果存在会被@vue/cli-service自动加载
 *       https://cli.vuejs.org/zh/config/#vue-config-js
 * @author BoBo
 * @copyright BoBo
 * @createDate 2018年11月13日16:49:39
 */
// eslint-disable-next-line import/no-extraneous-dependencies
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const productionGzipExtensions = ['js', 'css'];

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

// 系统标题统一在环境变量中配置
const PROJECT_NAME = process.env.VUE_APP_NAME;
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  // 为方便多项目部署，打包时使用项目名称
  outputDir: process.env.VUE_APP_OUTPUTDIR,
  // 域名，默认可以设置/dist/
  // 以下使用./相对路径不支持HTML5 history和构建多页面应用
  publicPath: './',
  // 生产环境打包时不启用SourceMap
  productionSourceMap: false,
  // 开发阶段服务器配置
  devServer: {
    port: process.env.PORT ? +process.env.PORT : 80,
  },
  // vue-cli3内部的webpack配置通过webpack-chain维护
  // 链式操作可参考 https://cli.vuejs.org/zh/guide/webpack.html
  chainWebpack: (config) => {
    // 从默认svg规则中排除src/icons路径，因为会当做图标自动加载
    config.module.rule('svg').exclude.add(resolve('src/icons'));
    // 添加svg-sprite-loader加载器
    config.module
      .rule('svg-sprite-loader')
      .test(/.svg$/)
      .include.add(resolve('src/icons')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
      .use('svgo-loader')
      .loader('svgo-loader')
      .end();
    // ============压缩图片 start============
    if (!isDev) {
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({ bypassOnDebug: true })
        .end();
    }
    // ============压缩图片 end============
    // 移除prefecth 提高首屏速度
    config.plugins.delete('prefetch');
    // 关闭自动注入，手动在index.html按需加载
    // 会导致菜单切换时请求新资源，但可提高30%首屏渲染速度
    config.plugin('html').tap((options) => {
      options[0].inject = false;
      options[0].title = PROJECT_NAME;
      // 向html模板注入 服务端URL地址,用于生产环境动态修改
      options[0].HOST_URL = process.env.VUE_APP_HOST_URL;
      options[0].PREFIX_URL = process.env.VUE_APP_API_URL;
      options[0].CHAT_URL = process.env.VUE_APP_CHAT_URL;
      return options;
    });
    // 是否在打包时输出分析报告
    if (process.env.IS_REPORT) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static',
        },
      ]);
    }
    // 构建时不打包公共资源，使用cdn加速
    if (process.env.VUE_APP_CDN === 'true') {
      // 编译时排除
      config.externals({
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        'element-ui': 'ELEMENT',
        axios: 'axios',
        lodash: '_',
        jsoneditor: 'JSONEditor',
        'core-js': 'core',
        'element-pro-crud': 'ProCrud',
      });
      // 向模板插入资源
      config.plugin('html-assets').use(HtmlWebpackIncludeAssetsPlugin, [
        {
          assets: [
            '/vue@2.6.11/dist/vue.min.js',
            '/vuex@3.5.1/dist/vuex.min.js',
            '/vue-router@3.4.3/dist/vue-router.min.js',
            '/element-ui@2.15.0/lib/index.js',
            '/element-ui@2.15.0/lib/theme-chalk/index.css',
            '/axios@0.19.2/dist/axios.min.js',
            '/lodash@4.17.14/lodash.min.js',
            '/core-js@2.6.5/client/shim.min.js',
            '/element-pro-crud@0.8.8-1/lib/ProCrud.umd.min.js',
            '/element-pro-crud@0.8.8-1/lib/ProCrud.css',
          ],
          append: false,
          // hash: true,
          publicPath: 'https://cdn.jsdelivr.net/npm',
        },
      ]);
    } else {
      // 不用cdn加速时，编译favcion
      config.plugin('html').tap((options) => {
        options[0].favicon = './src/assets/favicon.ico';
        return options;
      });
    }
  },
  configureWebpack: (config) => {
    if (!isDev) {
      // 开启gzip压缩
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
        threshold: 10240,
        minRatio: 0.8,
      }));
    }
  },
  css: {
    loaderOptions: {
      sass: {
        // eslint-disable-next-line global-require
        implementation: require('sass'), // This line must in sass option
      },
    },
  },
};
