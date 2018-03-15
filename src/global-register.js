// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { format, parse } from 'date-fns'
import { isMobile } from "utils/user-agent";

const Back = resolve => import('components/common/Back' /* webpackChunkName: "Back"*/);
const ImgTag = resolve => import('components/image/ImgTag' /* webpackChunkName: "ImgTag"*/);

const Pagination = resolve => import('components/table/Pagination' /* webpackChunkName: "Pagination"*/);
const SlideForMore = resolve => import('components/table/SlideForMore' /* webpackChunkName: "SlideForMore"*/);
const NoResult = resolve => import('components/common/NoResult' /* webpackChunkName: "NoResult"*/);

const InputBase = resolve => import('components/form/InputBase' /* webpackChunkName: "InputBase"*/);
const FileInput = resolve => import('components/form/FileInput' /* webpackChunkName: "FileInput"*/);
const TextareaBase = resolve => import('components/form/TextareaBase' /* webpackChunkName: "TextareaBase"*/);
const SelectBase = resolve => import('components/form/SelectBase' /* webpackChunkName: "SelectBase"*/);
const Datepicker = resolve => import('components/form/Datepicker' /* webpackChunkName: "Datepicker"*/);
const Linkage = resolve => import('components/form/Linkage' /* webpackChunkName: "Linkage"*/);

const Overlay = resolve => import('components/common/Overlay' /* webpackChunkName: "Overlay"*/);
const OverlayConfirm = resolve => import('components/common/OverlayConfirm' /* webpackChunkName: "OverlayConfirm"*/);

const Loading = resolve => import('components/common/Loading' /* webpackChunkName: "Loading"*/);

export default function () {
  // 注册全局组件
  Vue.component('back', Back);
  Vue.component('img-tag', ImgTag);

  Vue.component('no-result', NoResult);

  Vue.component('input-base', InputBase);
  Vue.component('file-input', FileInput);
  Vue.component('textarea-base', TextareaBase);
  Vue.component('select-base', SelectBase);
  Vue.component('datepicker', Datepicker);
  Vue.component('linkage', Linkage);

  Vue.component('overlay', Overlay);
  Vue.component('overlay-confirm', OverlayConfirm);

  if (!isMobile()) {
    Vue.component('pagination', Pagination);
  } else {
    Vue.component('loading', Loading);
    Vue.component('slide-for-more', SlideForMore);
  }

  Vue.filter('datePipe', (time, {fmt}) => format(parse(time), fmt || 'YYYY-MM-DD HH:mm:ss'));
  Vue.filter('amountPipe', (amount, {symbol, unit}) => (symbol || '') + amount + (unit || ''));

  Vue.mixin({
    methods: {
      log(...args) {
        console.log(...args)
      },
      alert(val) {
        alert(val)
      }
    }
  })
}
