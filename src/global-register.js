import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, format, parse } from 'date-fns'
import { Langs } from 'extensions/Langs'
import { isMobile } from 'utils/UserAgent'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

const Back = () => import('components/common/Back' /* webpackChunkName: "Back" */)
const ImgTag = () => import('vue-img-tag' /* webpackChunkName: "ImgTag" */)

const Pagination = () => import('@livelybone/vue-pagination' /* webpackChunkName: "Pagination" */)
const SlideForMore = () => import('vue-slide-for-more/lib/SlideForMore' /* webpackChunkName: "SlideForMore" */)
const NoResult = () => import('components/common/NoResult' /* webpackChunkName: "NoResult" */)

const VueBtn = () => import('@livelybone/vue-button' /* webpackChunkName: "VueBtn" */)
const InputBase = () => import('@livelybone/vue-input' /* webpackChunkName: "InputBase" */)
const FileInput = () => import('components/form/FileInput' /* webpackChunkName: "FileInput" */)

const Overlay = () => import('components/common/Overlay' /* webpackChunkName: "Overlay" */)
const OverlayConfirm = () => import('components/common/OverlayConfirm' /* webpackChunkName: "OverlayConfirm" */)

const PageContainer = () => import('components/common/PageContainer' /* webpackChunkName: "PageContainer" */)

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

  Vue.component('page-container', PageContainer)

  if (!isMobile()) {
    Vue.component('pagination', Pagination)
  } else {
    Vue.component('loading', Loading)
    Vue.component('slide-for-more', SlideForMore)
  }

  Vue.filter('datePipe', (time, { fmt }) => format(parse(time), fmt || 'YYYY-MM-DD HH:mm:ss'))
  Vue.filter('amountPipe', (amount, { symbol, unit }) => (symbol || '') + amount + (unit || ''))

  Vue.mixin({
    data() {
      return {
        Langs,
      }
    },
    methods: {
      log(...args) {
        console.log(...args)
      },
      alert(val) {
        alert(val)
      },
      dateFormatter(time, fmt) {
        return format(parse(time), fmt)
      },
      timeConversion(time) {
        // time 毫秒数
        const d = parse(time)
        const now = new Date()
        return {
          day: Math.floor(differenceInDays(d, now)),
          hour: differenceInHours(d, now) % 24,
          minute: differenceInMinutes(d, now) % 60,
          second: differenceInSeconds(d, now) % 60,
        }
      },
      switchLang(lang) {
        return this.$lang.setLang(lang, this)
      },
    },
  })
}
