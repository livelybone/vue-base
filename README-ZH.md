# vue-base
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![pre-render](https://img.shields.io/badge/realized-pre--render-blue.svg "pre-render")
![SSR](https://img.shields.io/badge/realized-SSR-blue.svg "SSR")
![webpack4](https://img.shields.io/badge/pack-webpack4-blue.svg "webpack4")

[vue-base](https://github.com/livelybone/vue-base): 一个 Vue.js 通用框架，实现预渲染和 SSR，集成 vue-i18n, eslint + prettier，vuex。打包工具是 webpack4，使用缓存、并行、happypack 进行优化

[English Document](./README.md)

## 注意事项

### 风格（非常重要）

> prettier: 代码风格统一。
>> 提交代码之前务必使用 `yarn run format` 格式化代码

> commitizen: 代码提交
>> 规范 commit message, <span style="color:red">使用 `yarn run commit` 代替 `git commit`</span>

> 注释规范
>> 1.As short as possible （如无必要，勿增注释）。尽量提高代码本身的清晰性、可读性。<br>
   2.As long as necessary （如有必要，尽量详尽）。合理的注释、空行排版等，可以让代码更易阅读、更具美感。<br>
   3.接口，项目通用函数的注释使用 [JSDoc](http://usejsdoc.org/index.html) 规范<br>
   4.其他地方的注释能将 why 解释清楚就行

### 兼容

> 如果要兼容 IE9，则不能使用 `transform` `flex` 等 css 属性，已有组件和页面中使用的 `flex 布局` 需要切换成兼容 IE9 的写法

> 可一次性引入 `babel-polyfill` 做 IE 兼容。或者，也可以为项目引入具体的 polyfills 完成 IE 兼容

> 有兴趣可以尝试改写成 [现代模式](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)

### html 模板

> 每个文件的 HTML 尽可能的小，嵌套尽可能的少。相同的地方尽可能的抽出公共组件

### Style

> 使用SASS预处理。全局使用 100px 作 1rem（移动端1px解决方案），宽高尺寸尽量使用rem单位（PC 和 Mobile 共用的组件如果有样式则必须使用rem）

> 公共样式写在 `common.scss`，公共变量分别写在 `font-variable.scss`, `size-variable.scss`, `color-variable.scss`，@mixin函数写在 `common-variable.scss`

> 同类型的属性值，最好抽出形成公共变量或者函数

### JS

> [ES6 规范](http://es6.ruanyifeng.com/)

> 全局状态管理使用 `vuex`，如果项目简单，可选择使用 `extensions/StorePlugin.js`

> 工具类写在 `utils` 文件夹，插件写在 `extensions` 文件夹，组件共用变量或者表单模板模板写在 `data/immutable-data` 文件夹，ajax 相关的写在 `data/api` 文件夹，全局状态管理文件写在 `data/store/modules` 文件夹

> 推荐使用 `const items = [{label:'姓名', name:'realName', value:'XXX'}]` 这种数据格式去渲染表单项，`label` 为表单项的渲染名称（在页面显示的名称），`name` 为表单项与后台接口对应的字段（域），`value` 为表单项的值，表单提交时可以使用 DataDeal 类的 dataDeal 方法处理（`DataDeal.dateDeal(items)`）（复杂情况可以特殊处理）

### 国际化

> 使用 `vue-i18n`

> 建议1: 页面语句应当少使用词语拼接，因为不同的语言语法是不同的，拼接可能会让最后得出的语句不伦不类
> 比如：
>> ‘未选择任何文件’ 的英文翻译为 'No files were selected'，<br>
>> 如果使用 `this.$t('unselected') + this.$t('any-file')`:<br>
>> 中文为 `'未选择' + '任何文件'`;<br>
>> 英文翻译为 `'unselected ' + 'any file '` => `'unselected any file'`，显得不伦不类了

> 建议2: 页面可能共用的语句写在 `common.js` 中，其它的词汇语句可按照业务功能做命名空间写在 `index.js`，或者使用单独的文件

### SEO 方案

> PrerenderSpaPlugin (git 分支 `pre-render`): 预渲染，生成静态 html 文件，再用 Nginx 配置路由即可。

> 服务端渲染([SSR](https://ssr.vuejs.org/zh/)) (git 分支 `ssr`): 如果是构建社交类或是新闻类网站，有很多类似博客或是新闻的页面（公开的，数量巨大的，都能被搜索到的），还请使用 SSR，预渲染不适合做如此庞大的操作

## Build Setup

``` bash
# 安装依赖
yarn install

# 配置文件
cp config/config.js.sample config/config.js

# HMR 开发
yarn start

# 将一些项目中常用的，固定的，不常更换的第三方库打包成 `**.dll.js`，使用 DllPlugin，确保在这些库发生变化之后重新打包
yarn run dll

# 打包成生产环境可用的静态文件资源，确保 `**.dll.js` 存在
# 当 `USE_HAPPYPACK` 不为空时，happypack 将被启用
# 小项目不推荐使用 happypack，打包速度没有明显的优化
cross-env USE_HAPPYPACK=[value] yarn run build

# 打包成生产环境可用的静态文件资源，并且生成图表
cross-env USE_HAPPYPACK=[value] yarn run build --report
```

工作原理请看 [指南](http://vuejs-templates.github.io/webpack/), [vue-loader 文档](http://vuejs.github.io/vue-loader) 和 webpack 配置文件.

## Components

> [vue-img-tag](https://github.com/livelybone/vue-img-tag)([示例](https://livelybone.github.io/vue/vue-img-tag/))，图片组件，支持懒加载，支持图片文件的预览，图片可传：`[String, File, FileList, Promise<Blob, String>]`

> [vue-scrollbar-live](https://github.com/livelybone/vue-scrollbar-live)([示例](https://livelybone.github.io/vue/vue-scrollbar-live/))，自定义滚动条，移动端建议使用原生滚动条

> [vue-slide-for-more](https://github.com/livelybone/vue-slide-for-more)([示例](https://livelybone.github.io/vue/vue-slide-for-more/))，实现 mobile 端上滑刷新，下滑加载更多功能

> [vuejs-snackbar](https://github.com/livelybone/vuejs-snackbar)([示例](https://livelybone.github.io/vue/vuejs-snackbar/))，自定义 snackbar（提示框）插件

> [@livelybone/vue-loading](https://github.com/livelybone/vue-loading)([示例](https://livelybone.github.io/vue/vue-loading/))，加载动画

> [@livelybone/vue-input](https://github.com/livelybone/vue-input)([示例](https://livelybone.github.io/vue/vue-input/))，input/textarea 标签的封装，实现 `pristine` `valid` 检查，解决双向绑定时中文输入在 safari 浏览器上的 bug，真正实现密码自动填充功能开关

> [@livelybone/vue-datepicker](https://github.com/livelybone/vue-datepicker)([示例](https://livelybone.github.io/vue/vue-datepicker/))，datepicker, timepicker, datetimePicker

> [@livelybone/vue-select](https://github.com/livelybone/vue-select)([示例](https://livelybone.github.io/vue/vue-select/))，自定义 select，包括 cascader，实现多选

> [@livelybone/vue-popper](https://github.com/livelybone/vue-popper)([示例](https://livelybone.github.io/vue/vue-popper/))，[popper.js](https://popper.js.org) 的封装，并扩展实现了对箭头位置的控制

> [@livelybone/vue-table](https://github.com/livelybone/vue-table)([示例](https://livelybone.github.io/vue/vue-table/))，table 标签的封装，实现单元格宽度拖拽修改

> [@livelybone/vue-button](https://github.com/livelybone/vue-button)([示例](https://livelybone.github.io/vue/vue-button/))，button 标签的封装，实现防抖功能，实现中间状态自定义

> [@livelybone/vue-pagination](https://github.com/livelybone/vue-pagination)([示例](https://livelybone.github.io/vue/vue-pagination/))，pagination，分页，实现输入页数跳转，实现不知道总页数情况的分页

> [pretty-checkbox-vue](https://github.com/hamed-ehtesham/pretty-checkbox-vue)([示例](https://hamed-ehtesham.github.io/pretty-checkbox-vue/))，checkbox，radio，单选多选


## Tools

> [@livelybone/mouse-wheel](https://github.com/livelybone/mouse-wheel)，封装好的 mouse wheel 事件，移动增量统一

> [@livelybone/copy](https://github.com/livelybone/copy)([示例](https://livelybone.github.io/tool/copy/))，复制到剪切板 `copyDom` `copyText`，对象复制 `objectDeepCopy` `objectSimpleCopy`，对象深度合并 `objectDeepMerge`

> [@livelybone/meta-scale](https://github.com/livelybone/meta-scale)，获取页面 viewport 的缩放比例

> [@livelybone/simple-observer](https://github.com/livelybone/simple-observer)，简单 Observer（发布/订阅模式） 实现

> [@livelybone/touch](https://github.com/livelybone/touch)，touch 封装， 实现事件：pan, pinch, tap, press, swipe, rotate

> [@livelybone/scroll-get](https://github.com/livelybone/scroll-get)([示例](https://livelybone.github.io/tool/scroll-get/))，获取元素相对于页面/窗口的位置

> [@livelybone/storage](https://github.com/livelybone/storage)([示例](https://livelybone.github.io/tool/storage/))，localStorage 的封装，不能使用时降级到 Cookie 或 Map

> [img-about](https://github.com/livelybone/img-about)([示例](https://livelybone.github.io/tool/img-about/))，在浏览器中实现压缩图片，获得图像的原始大小

> [base64-blob](https://github.com/livelybone/base64-blob)，base64 与 Blob 互相转换

> [date-generator](https://github.com/livelybone/date-generator)([示例](https://livelybone.github.io/tool/date-generator/))，用于生成日历数据，对开发日历组件有很大的帮助

> [@livelybone/rem-init](https://github.com/livelybone/rem-init)，手机端 1px 解决方案，将 html 的 font-size 设置成 625%(100px) 的倍数，不兼容 IE8

