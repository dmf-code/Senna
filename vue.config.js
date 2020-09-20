module.exports = {
  assetsDir: 'static',
  parallel: false,
  publicPath: '/', //publicPath取代了baseUrl
  outputDir: 'dist',
  lintOnSave: true,
  runtimeCompiler: true, //关键点在这  原来的 Compiler 换成了 runtimeCompiler
  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
  chainWebpack: () => {},
  configureWebpack: () => {},
  // 配置 webpack-dev-server 行为。
  devServer: {
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
    proxy: {
      "/api": { // 代理接口前缀为/apis的请求
        "target": 'http://127.0.0.1:8888/', // 对应的代理地址
        "secure": false, // 接受运行在https上，默认不接受
        "changeOrigin": true, // 如果设置为true,那么本地会虚拟一个服务器接收你的请求并代你发送该请求，这样就不会有跨域问题（只适合开发环境）
        "pathRewrite": { //重写路径 比如'/apis/aaa/ccc'重写为'/aaa/ccc'
          '^/api': ''
        }
      }
    }, // string | Object
    before: app => {},
  }
}