
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "assets": "@/assets",
        "components": "@/components",
        "views": "@/views",
        "libs": "@/libs",
        "typings": "@/typings",
        "hooks": "@/hooks",
        "network": "@/network",
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5,//设置根元素的字体大小  HTML font-size//37.5   75  
            propList: ['*'],//*表示所有属性 都把 px转化为 rem
            exclude: /node_modules/i,//排除node_modules 目录下所有文件
            selectorBlackList: ['vant-', '.my-'],//过滤掉vant-开头的选择器  .my-是有一些自己定义的，但是不想 转化的

          }),
        ]
      }
    }
  }
}