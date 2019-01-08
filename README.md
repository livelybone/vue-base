# project

> A Vue.js project

> html 模板：每个文件的 HTML 尽可能的小，嵌套尽可能的少。相同的地方尽可能的抽出公共组件

> style: 使用SASS预处理，全局使用 100px 作 1rem（移动端做相应1px解决方案），宽高尺寸尽量使用rem单位（PC 和 Mobile 共用的组件如果有样式则必须使用rem）

> style: 公共样式写在 common.scss，公共变量分别写在 font-variable.scss/size-variable.scss/color-variable.scss，@mixin函数写在 common-variable.scss

> style: 同类型的属性值，最好抽出形成公共变量或者函数

> style: 如果所有 css 被 ExtractTextWebpackPlugin 抽取成一个 css 文件, 那么 css 文件最好不要有图片（比如 background: url('/assets/logo.png'), 原因： webpack url-loader 设置为 10kb 以下的文件会被转为base64嵌入到相应的母文件）

> style: 如果要兼容 IE9，则不能使用 `transform` `flex` 等css，已有组件和页面中使用的 `flex 布局` 需要切换成兼容 IE9 的写法

> js：es6 规范

> js: 全局状态管理使用 vuex，如果项目简单，可选择使用 extensions/StorePlugin.js

> js: 工具类写在 utils 文件夹，插件写在 extensions 文件夹，组件共用变量或者模板写在 data/immutable-data 文件夹，ajax 相关的写在 data/api 文件夹，全局状态管理文件写在 data/store/modules 文件夹

> js: ajax 表单渲染数据格式推荐 `const items = [{name:'姓名', alias:'realName', value:'XXX'}]`，表单提交时可以使用 DataDeal 类的 dataDeal 方法处理（`DataDeal.dateDeal(items)`）（复杂情况可以特殊处理），name 为表单项的渲染名称（在页面显示的名称），alias 为表单项与后台接口对应的字段，value 为表单项的值 

> 国际化: 使用i18n。建议：页面语句应当少使用词语拼接，因为不同的语言语法可能同，拼接可能会让最后得出的语句不伦不类；页面可能共用的词或者语句写在 `common.js` 中，其它的词汇语句按照业务功能做命名空间写在 `index.js`

> SEO 优化使用 SSR，生产环境使用 Node，需要登录验证的页面请避免做 ssr (这些页面本身就不允许被抓取)，只做需要被搜索引擎抓取的页面，如果这种页面数量很少，可以转用 prerender 预渲染

> ssr组件缓存: 使用 lru-cache，在需要使用缓存的的组件中使用 serverCacheKey 和 name(必须是唯一的) 定义组件的 id

> ssr数据预取: 通过 asyncData 函数在服务器预先取得数据，然后自动嵌入最终的 html 中，在客户端通过 `window.__INITIAL_STATE__` 获取数据，因此，不要二次获取数据！先判断该数据存不存在，如果不存在，则再次获取

## Build Setup

``` bash
# install dependencies
npm install

# build config
cp config/config.js.sample config/config.js

# serve with hot reload at localhost:8080 (with no ssr)
npm run dev

# build static file for production with minification (with no ssr)
npm run build:static

# build for production and view the bundle analyzer report
npm run build:static --report

# build for production width minification (with ssr)
npm run build:ssr

# start in production environment (with ssr)
npm start

# build and start in production environment (with ssr)
npm run server
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Components

> [vue-img-tag](https://github.com/livelybone/vue-img-tag)([示例](https://livelybone.github.io/vue/vue-img-tag/))，图片组件，支持懒加载，支持图片文件的预览，图片可传：`[String, File, FileList, Promise<Blob, String>]`

> [vue-scrollbar-live](https://github.com/livelybone/vue-scrollbar-live)([示例](https://livelybone.github.io/vue/vue-scrollbar-live/))，自定义滚动条，移动端建议使用原生滚动条

> [vue-slide-for-more](https://github.com/livelybone/vue-slide-for-more)([示例](https://livelybone.github.io/vue/vue-slide-for-more/))，实现 mobile 端上滑刷新，下滑加载更多功能

> [vuejs-snackbar](https://github.com/livelybone/vuejs-snackbar)([示例](https://livelybone.github.io/vue/vuejs-snackbar/))，自定义 snackbar（提示框）插件

> [@livelybone/vue-loading](https://github.com/livelybone/vue-loading)([示例](https://livelybone.github.io/vue/vue-loading/))，加载动画

> [@livelybone/vue-input](https://github.com/livelybone/vue-input)([示例](https://livelybone.github.io/vue/vue-input/))，input/textarea 标签的封装，实现 `pristine` `valid` 检查，解决双向绑定时中文输入在 safari 浏览器上的 bug

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

> [img-about](https://github.com/livelybone/img-about)([示例](https://livelybone.github.io/tool/img-about/))，图片在浏览器压缩, 获取图片原始大小

> [base64-blob](https://github.com/livelybone/base64-blob)，base64 与 Blob 互相转换

> [date-generator](https://github.com/livelybone/date-generator)([示例](https://livelybone.github.io/tool/date-generator/))，用于生成日历数据，对开发日历组件有很大的帮助

> [@livelybone/rem-init](https://github.com/livelybone/rem-init)，手机端 1px 解决方案，将 html 的 font-size 设置成 625%(100px) 的倍数，不兼容 IE8

