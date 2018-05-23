# project

> A Vue.js project

> html 模板：每个文件的 HTML 尽可能的小，嵌套尽可能的少。相同的地方尽可能的抽出公共组件

> style: 使用SASS预处理，全局使用 100px 作 1rem（移动端做相应1px解决方案），宽高尺寸尽量使用rem单位（PC 和 Mobile 共用的组件如果有样式则必须使用rem）

> style: 公共样式写在 common.scss，公共变量分别写在 font-variable.scss/size-variable.scss/color-variable.scss，@mixin函数写在 common-variable.scss

> style: 同类型的属性值，最好抽出形成公共变量或者函数

> js：es6 规范

> js: 全局状态管理使用 vuex，如果项目简单，可选择使用 extensions/store.js

> js：工具类写在 utils 文件夹，插件写在 extensions 文件夹，组件共用变量或者模板写在 data/immutable-data 文件夹，ajax 相关的写在 data/api 文件夹，全局状态管理文件写在 data/store/modules 文件夹

> js: ajax 表单渲染数据格式推荐 const items = [{name:'姓名', alias:'realName', value:'XXX'}]，表单提交时可以使用 DataDeal 类的 dataDeal 方法处理（复杂情况可以特殊处理），name 为表单项的渲染名称（在页面显示的名称），alias 为表单项与后台接口对应的字段，value 为表单项的值 

> SEO 优化使用预渲染 PrerenderSpaPlugin 代替 服务端渲染（SSR），生成静态 html 文件，再用 Nginx 配置路由即可，如果是构建社交类或是新闻类网站，有很多类似博客或是新闻的页面（公开的，数量巨大的，都能被搜索到的），还请使用 SSR，预渲染不适合做如此庞大的操作

## Build Setup

``` bash
# install dependencies
npm install

# build config
cp config/config.js.sample config/config.js

# serve with hot reload at localhost:8080
npm start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
