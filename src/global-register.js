import { format, parse } from 'date-fns'
import { isMobile } from 'utils/user-agent'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

const Back = () => import('components/common/Back' /* webpackChunkName: "Back" */)
const ImgTag = () => import('vue-img-tag' /* webpackChunkName: "ImgTag" */)

const Pagination = () => import('components/table/Pagination' /* webpackChunkName: "Pagination" */)
const SlideForMore = () => import('vue-slide-for-more/lib/SlideForMore' /* webpackChunkName: "SlideForMore" */)
const NoResult = () => import('components/common/NoResult' /* webpackChunkName: "NoResult" */)

const VueBtn = () => import('@livelybone/vue-button' /* webpackChunkName: "VueBtn" */)
const InputBase = () => import('@livelybone/vue-input' /* webpackChunkName: "InputBase" */)
const FileInput = () => import('components/form/FileInput' /* webpackChunkName: "FileInput" */)

const Overlay = () => import('components/common/Overlay' /* webpackChunkName: "Overlay" */)
const OverlayConfirm = () => import('components/common/OverlayConfirm' /* webpackChunkName: "OverlayConfirm" */)

const Loading = () => import('@livelybone/vue-loading' /* webpackChunkName: "Loading" */)

export default function () {
  // 注册全局组件
  Vue.component('back', Back)
  Vue.component('img-tag', ImgTag)

  Vue.component('no-result', NoResult)

  Vue.component('btn', VueBtn)
  Vue.component('input-base', InputBase)
  Vue.component('file-input', FileInput)

  Vue.component('overlay', Overlay)
  Vue.component('overlay-confirm', OverlayConfirm)

  if (!isMobile()) {
    Vue.component('pagination', Pagination)
  } else {
    Vue.component('loading', Loading)
    Vue.component('slide-for-more', SlideForMore)
  }

  Vue.filter('datePipe', (time, { fmt }) => format(parse(time), fmt || 'YYYY-MM-DD HH:mm:ss'))
  Vue.filter('amountPipe', (amount, { symbol, unit }) => (symbol || '') + amount + (unit || ''))

  Vue.mixin({
    methods: {
      log(...args) {
        console.log(...args)
      },
      alert(val) {
        alert(val)
      },
    },
  })
}
