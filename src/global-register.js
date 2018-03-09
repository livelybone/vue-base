// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import moment from 'moment'
import Back from 'components/common/Back'
import ImgTag from 'components/image/ImgTag'

import Pagination from 'components/table/Pagination'
import NoResult from 'components/common/NoResult'

import InputBase from 'components/form/InputBase'
import FileInput from 'components/form/FileInput'
import TextareaBase from 'components/form/TextareaBase'
import SelectBase from 'components/form/SelectBase'
import Datepicker from 'components/form/Datepicker'
import Linkage from 'components/form/Linkage'

import Overlay from 'components/common/Overlay'
import OverlayConfirm from 'components/common/OverlayConfirm'

export default function () {
  // 注册全局组件
  Vue.component('back', Back);
  Vue.component('img-tag', ImgTag);

  Vue.component('pagination', Pagination);
  Vue.component('no-result', NoResult);

  Vue.component('input-base', InputBase);
  Vue.component('file-input', FileInput);
  Vue.component('textarea-base', TextareaBase);
  Vue.component('select-base', SelectBase);
  Vue.component('datepicker', Datepicker);
  Vue.component('linkage', Linkage);

  Vue.component('overlay', Overlay);
  Vue.component('overlay-confirm', OverlayConfirm);

  Vue.filter('moment', (time, {parse, format}) => moment(time, parse).format(format || 'YYYY-MM-DD HH:mm:ss'))

  Vue.mixin({
    methods: {
      log(val) {
        console.log(val)
      }
    }
  })
}
