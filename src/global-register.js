// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import moment from 'moment'
import Back from 'components/common/back'
import ImgTag from 'components/image/image-tag'
import InputBase from 'components/form/input-base'
import FileInput from 'components/form/file-input'
import TextareaBase from 'components/form/textarea-base'
import SelectBase from 'components/form/select-base'
import Datepicker from 'components/form/datepicker'
import Linkage from 'components/form/linkage'
import Overlay from 'components/common/overlay'
import OverlayConfirm from 'components/common/overlay-confirm'

export default function () {
  // 注册全局组件
  Vue.component('back', Back);
  Vue.component('img-tag', ImgTag);
  Vue.component('input-base', InputBase);
  Vue.component('file-input', FileInput);
  Vue.component('textarea-base', TextareaBase);
  Vue.component('select-base', SelectBase);
  Vue.component('datepicker', Datepicker);
  Vue.component('linkage', Linkage);
  Vue.component('overlay', Overlay);
  Vue.component('overlay-confirm', OverlayConfirm);

  Vue.filter('moment', (time, {parse, format}) => moment(time, parse).format(format))
}
