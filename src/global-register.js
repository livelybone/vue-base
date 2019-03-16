import VueBtn from '@livelybone/vue-button'
import InputBase from '@livelybone/vue-input'
import Loading from '@livelybone/vue-loading'
import Pagination from '@livelybone/vue-pagination'
import Back from '@/components/common/Back'
import NoResult from '@/components/common/NoResult'
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
  parse,
} from 'date-fns'
import { Langs } from '@/extensions/Langs'
import { isBrowser } from '@/utils/UserAgent'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ImgTag from 'vue-img-tag'
import { SlideForMore } from 'vue-slide-for-more'
import Overlay from '@/components/common/Overlay'

const FileInput = () =>
  import('@/components/form/FileInput' /* webpackChunkName: "FileInput" */)

export default function() {
  const isMobile = isBrowser && window.isMobile

  // 注册全局组件
  Vue.component('back', Back)
  Vue.component('img-tag', ImgTag)

  Vue.component('no-result', NoResult)

  Vue.component('btn', VueBtn)
  Vue.component('input-base', InputBase)
  Vue.component('file-input', FileInput)

  Vue.component('overlay', Overlay)

  Vue.component('loading', Loading)

  if (isMobile) {
    Vue.component('slide-for-more', SlideForMore)
  } else {
    Vue.component('pagination', Pagination)
  }

  Vue.filter('datePipe', (time, { fmt }) =>
    format(parse(time), fmt || 'YYYY-MM-DD HH:mm:ss'),
  )
  Vue.filter(
    'amountPipe',
    (amount, { symbol, unit }) => (symbol || '') + amount + (unit || ''),
  )

  Vue.prototype.isMobile = isMobile

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
        const l = lang && lang.toLowerCase()
        const {
          path,
          params: { lang: language },
        } = this.$route
        if (l !== language) {
          this.$router.push({
            ...this.$route,
            path: path.replace(language, lang),
          })
        }
      },
    },
  })
}
