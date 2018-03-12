# project

> A Vue.js project

> html 模板：每个文件的 HTML 尽可能的小，嵌套尽可能的少。相同的地方尽可能的抽出公共组件

> style: 使用SASS预处理，全局使用 100px 作 1rem（移动端做相应1px解决方案），宽高尺寸尽量使用rem单位（PC 和 Mobile 共用的组件如果有样式则必须使用rem）

> style: 公共样式写在 common.scss，公共变量分别写在 font-variable.scss/size-variable.scss/color-variable.scss，@mixin函数写在 common-variable.scss

> style: 同类型的属性值，最好抽出形成公共变量或者函数

> js：es6 规范

> js：工具类写在 utils 文件夹，插件写在 extensions 文件夹，ajax 相关的写在 data/api 文件夹，组件共用变量或者模板写在 data/data-maintaining 文件夹

> SEO 优化使用 PrerenderSpaPlugin 代替 服务端渲染（SSR），生成静态 html 文件，再用 Nginx 配置路由即可

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
