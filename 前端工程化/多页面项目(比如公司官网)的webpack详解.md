# 多页面项目webpack配置详解

> 在使用webpack时，只有清楚每个npm包的作用，才能根据需求灵活配置

做公司官网类似的多页面应用时，为了便于维护，比如想使用scss/less,或者想要使用es6的最新特性，最好的方式就是使用webpack打包。

[目前在用的一些配置](https://github.com/JesseZhao1990/multipage-webpack-scaffolding)

| 支持特性                                               | 使用的loader            | 使用的插件                                       |
| ------------------------------------------------------ | :---------------------- | ------------------------------------------------ |
| scss                                                   | Node-sass sass-loader   |                                                  |
| es6                                                    | Babel-core babel-loader | Babel-preset-env  babel-plugin-transform-runtime |
| 生成html页面，自动引入资源                             |                         | html-webpack-plugin                              |
| 处理html中的img标签引入的资源                          | html-withimg-loader     |                                                  |
| 图片大小小于一定程度时，转化成base64格式，提高加载速度 | url-loader              |                                                  |
| 将css文件从Js中抽取出来，放入单独的文件                |                         | extract-text-webpack-plugin                      |
| 压缩js文件                                             |                         | uglifyjs-webpack-plugin                          |
| 每次打包时，先删除dist目录，再重新构建                 |                         | clean-webpack-plugin                             |





参考文章 https://segmentfault.com/a/1190000004511992