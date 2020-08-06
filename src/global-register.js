// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import LinkTo from '@/common/components/LinkTo'
import Modal from '@/common/components/Modal'
import NoResult from '@/common/components/NoResult'
import Overlay from '@/common/components/Overlay'
import { dateFormatter, timeConversion } from '@/common/utils/TimeAbout'
import { isBrowser } from '@/common/utils/UserAgent'
import VueBtn from '@livelybone/vue-button'
import InputBase from '@livelybone/vue-input'
import Loading from '@livelybone/vue-loading'
import Pagination from '@livelybone/vue-pagination'
import Vue from 'vue'
import ImgTag from 'vue-img-tag'
import { SlideForMore } from 'vue-slide-for-more'

const FileInput = () =>
  import(
    '@/common/components/form/FileInput' /* webpackChunkName: "FileInput" */
  )

export default function() {
  const isMobile = isBrowser && window.isMobile

  // Register global components
  Vue.component('link-to', LinkTo)
  Vue.component('img-tag', ImgTag)

  Vue.component('no-result', NoResult)

  Vue.component('btn', VueBtn)
  Vue.component('input-base', InputBase)
  Vue.component('file-input', FileInput)

  Vue.component('overlay', Overlay)
  Vue.component('modal', Modal)

  Vue.component('loading', Loading)

  if (isMobile) {
    Vue.component('slide-for-more', SlideForMore)
  } else {
    Vue.component('pagination', Pagination)
  }

  Vue.filter('datePipe', dateFormatter)

  Vue.prototype.isMobile = isMobile

  Vue.mixin({
    methods: {
      log: console.log,
      error: console.error,
      warn: console.warn,
      alert: isBrowser ? alert : console.log,
      dateFormatter,
      timeConversion,
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
