# vue-base ([中文版](./README-ZH.md))
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![pre-render](https://img.shields.io/badge/realized-pre--render-blue.svg "pre-render")
![SSR](https://img.shields.io/badge/realized-SSR-blue.svg "SSR")
![webpack4](https://img.shields.io/badge/pack-webpack4-blue.svg "webpack4")

A Vue.js general framework, implement pre-render and SSR, integrated vue-i18n, eslint + prettier, vuex. The packaging tool is webpack4, optimized with cache, parallel, happypack

## NOTES

### Style of Coding (important)

> prettier: About style of code
>> Be sure to format code by running command ` npm run format ` before submit

> commitizen: About `git commit`
>> Standardize the commit message, <span color=red>use command `npm run commit` instead of command `git commit`</span>

> Annotation
>> 1.As short as possible. Try to improve the clarity and readability of the code.<br>
   2.As long as necessary. Make the code more readable and aesthetic by reasonable comments, blank lines, etc.<br>
   3.Annotation of interfaces, general functions use [JSDoc](http://usejsdoc.org/index.html) <br>
   4.Annotation in other place need to be able to explain why

### Compatibility

> If you want your project be compatible with IE9, do not use CSS properties such as `transform`, `flex`, etc.

> You can inject the `Babel-polyfill` or some specific polyfills  to deal compatibility of IE

> If you are interested, you can rewrite the compilation of project as [modern mode](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)

### html 模板

> The HTML in each file is as small as possible, with as little nesting as possible. Extract the common components to reduce code

### Style

> SASS is used for pre-processing. `1rem` is equal to `100px` globally (Mobile 1px solution), and use `rem` for width and height as far as possible (Styles of components shared by both PC and Mobile must use `rem`).

> Common styles are written in `common.scss`, and public variables are written in `font-variable.scss`, `size-variable.scss`, `color-variable.scss`, and @mixin functions are written in `common-variable.scss`

> Attribute values of the same type should be extracted to a public variable or function

> If all CSS files are extracted into a single CSS file, the CSS file should not use images (such as background: url('/assets/logo.png'), reason: Files under 10kb in size will be convert into base64 and embedded into the corresponding parent file by webpack `url-loader`).

### JS

> [ES6 document](http://es6.ruanyifeng.com/)

> Using `vuex` to manage the global state. If the project is simple, you can use `extensions/StorePlugin.js` instead

> Utils function written in `utils` folder, plugins for project written in `extensions` folder, Shared variables or components form template template written in `data/immutable-data` folder, ajax relevant written in `data/api` folder, global state management files written in ` data/store/modules ` folder

> It is recommended to use the data like `const items = [{label:'姓名', name:'realName', value:'XXX'}]` to render the form items. `label` is the name of the form item show in the page, `name` is the form name which will be submitted to backend, `value` is the value of the item. You can use `DataDeal. DateDeal(items)` to deal the data when submitting the form (complex situations can be special treatment)

### Internationalization

> Use `vue-i18n`

> Rule 1: Page statements should not use word concatenation. Due to the syntax of different language is different, concatenation may make the final statement strange
> Example：
>> Translation of '未选择任何文件' is 'No files were selected',<br>
>> it's word concatenation is `this.$t('unselected') + this.$t('any-file')`:<br>
>> Chinese is `'未选择' + '任何文件'`,<br>
>> English is `'unselected ' + 'any file '` => `'unselected any file'`, this gonna be very strange

> Rule 2: Statements shared in many pages written in `common.js`, other words written in the `index.js` by namespace, or written in a separate file

### SEO 方案

> PrerenderSpaPlugin (git branch `pre-render`): Generate the static HTML file with details, then configure the routing with Nginx。

> [SSR](https://ssr.vuejs.org/) (git branch `ssr`): If you're building a social or news site that has a lot of blogs or news pages (public, huge, searchable), use SSR. Pre-rendering is not suitable for such a large operation

## Build Setup

``` bash
# install dependencies
npm install

# build config
cp config/config.js.sample config/config.js

# serve with hot reload at localhost:8080 (with no ssr)
npm start

# build dll file for production with minification, insure that running after the `dlls` in `webpack.dll.conf.js` changed
npm run dll

# build static file for production with minification(with no ssr), insure that dll js files exist before running, or it will throw an Error about DllReferencePlugin
# HappyPack for build will be enabled when USE_HAPPYPACK set to non-null
# Happypack is not recommended for smaller projects
cross-env USE_HAPPYPACK=[value] npm run build:ssr

# build for production and view the bundle analyzer report
cross-env USE_HAPPYPACK=[value] npm run build:static --report

# build for production with minification(with ssr), insure that dll js files exist before running, or it will throw an Error about DllReferencePlugin
cross-env USE_HAPPYPACK=[value] npm run build:ssr

# start in production environment(with ssr)
cross-env USE_HAPPYPACK=[value] npm start:ssr

# build and start in production environment(with ssr)
cross-env USE_HAPPYPACK=[value] npm run server
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/), [docs for vue-loader](http://vuejs.github.io/vue-loader), and the webpack config files.

## Components

> [vue-img-tag](https://github.com/livelybone/vue-img-tag)([Example](https://livelybone.github.io/vue/vue-img-tag/)), image component, support lazy-load, support preview of image files, `src` type options: `[String, File, FileList, Promise<Blob, String>]`

> [vue-scrollbar-live](https://github.com/livelybone/vue-scrollbar-live)([Example](https://livelybone.github.io/vue/vue-scrollbar-live/)), custom scroll bar

> [vue-slide-for-more](https://github.com/livelybone/vue-slide-for-more)([Example](https://livelybone.github.io/vue/vue-slide-for-more/)), implemented feature: slide up for refreshing, slide down for load more

> [vuejs-snackbar](https://github.com/livelybone/vuejs-snackbar)([Example](https://livelybone.github.io/vue/vuejs-snackbar/)), snackbar

> [@livelybone/vue-loading](https://github.com/livelybone/vue-loading)([Example](https://livelybone.github.io/vue/vue-loading/)), loading svg

> [@livelybone/vue-input](https://github.com/livelybone/vue-input)([Example](https://livelybone.github.io/vue/vue-input/)), wrapper of input/textarea, implemented the `pristine`/`valid` check of input, solved the bug of Chinese input in safari when bidirectional binding, Truly realize the control of automatic password filling

> [@livelybone/vue-datepicker](https://github.com/livelybone/vue-datepicker)([Example](https://livelybone.github.io/vue/vue-datepicker/)), datepicker, timepicker, datetimePicker

> [@livelybone/vue-select](https://github.com/livelybone/vue-select)([Example](https://livelybone.github.io/vue/vue-select/)), custom select, cascader, realized multi select

> [@livelybone/vue-popper](https://github.com/livelybone/vue-popper)([Example](https://livelybone.github.io/vue/vue-popper/)), wrapper of [popper.js](https://popper.js.org) in Vue, and realized the control to the arrow position

> [@livelybone/vue-table](https://github.com/livelybone/vue-table)([Example](https://livelybone.github.io/vue/vue-table/)), wrapper of table, implemented drag and drop changes to cell width

> [@livelybone/vue-button](https://github.com/livelybone/vue-button)([Example](https://livelybone.github.io/vue/vue-button/)), wrapper of button, realized anti-shake, realized custom the middle state

> [@livelybone/vue-pagination](https://github.com/livelybone/vue-pagination)([Example](https://livelybone.github.io/vue/vue-pagination/)), pagination

> [pretty-checkbox-vue](https://github.com/hamed-ehtesham/pretty-checkbox-vue)([Example](https://hamed-ehtesham.github.io/pretty-checkbox-vue/)), checkbox, radio


## Tools

> [@livelybone/mouse-wheel](https://github.com/livelybone/mouse-wheel), wrapper of mouse wheel event, make the delta of each wheel event the same

> [@livelybone/copy](https://github.com/livelybone/copy)([Example](https://livelybone.github.io/tool/copy/)), copy to clipboard: `copyDom` `copyText`, copy object: `objectDeepCopy` `objectSimpleCopy`, merge object: `objectDeepMerge`

> [@livelybone/meta-scale](https://github.com/livelybone/meta-scale), get the initial-scale value of the page viewport

> [@livelybone/simple-observer](https://github.com/livelybone/simple-observer), simple implementation of Observer (Publish/subscribe mode)

> [@livelybone/touch](https://github.com/livelybone/touch), wrapper of touch, implemented events：pan, pinch, tap, press, swipe, rotate

> [@livelybone/scroll-get](https://github.com/livelybone/scroll-get)([Example](https://livelybone.github.io/tool/scroll-get/)), get the position of the element relative to the page/client

> [@livelybone/storage](https://github.com/livelybone/storage)([Example](https://livelybone.github.io/tool/storage/)), wrapper of localStorage, when not available, it is degraded to use cookie or Map

> [img-about](https://github.com/livelybone/img-about)([Example](https://livelybone.github.io/tool/img-about/)), implemented compression in the browser and get the original size of the image

> [base64-blob](https://github.com/livelybone/base64-blob), implemented the conversion between base64 and Blob

> [date-generator](https://github.com/livelybone/date-generator)([Example](https://livelybone.github.io/tool/date-generator/)), Used to generate calendar data, a great help for the development of calendar components

> [@livelybone/rem-init](https://github.com/livelybone/rem-init), Mobile 1px solution, set HTML font-size to 625%(100px) multiples, but not compatible with IE8

