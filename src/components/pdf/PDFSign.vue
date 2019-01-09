<template>
  <div class="pdf-sign-wrap">
    <span class="tip">{{$t('signature.how-to-sign')}}</span>
    <div class="pdf-wrap">
      <pdf-page class="pdf" :src="src" :page="page" @page-loaded="getWrapSize()" @toPage="toPage"/>
      <div class="sign-wrap" ref="wrap" @dragover="dragOver($event)" @drop="drop($event)">
        <img-tag v-if="!isNew&&imgPosition&&page===position.page"
                 :src="signature"
                 :style="{left:imgPosition.left+'px',bottom:imgPosition.bottom+'px'}"
                 @dragStart="dragStart($event)"/>
      </div>
      <div class="signature">
        <h2>{{$t('signature.all')}}</h2>
        <img-tag :src="signature"
                 @load="getImgSize($event)"
                 @dragStart="isNew = truedragStart($event)"
                 @dragEnd="isNew = false"/>
      </div>
    </div>
  </div>
</template>

<script>
import pdfPage from 'components/pdf/PDFPage'

export default {
  name: 'PDFSign',
  components: { 'pdf-page': pdfPage },
  props: {
    src: {
      validator(val) {
        return !val || typeof val === 'string' || val instanceof Object || val instanceof FileList
      },
    },
    signature: {
      validator(val) {
        return !val || typeof val === 'string' || val instanceof FileList
      },
    },
    position: {
      default() {
        return { page: 1, left: undefined, bottom: undefined }
      },
      type: Object,
    },
  },
  data() {
    return {
      numPages: null,
      page: 1,
      isNew: false,
      wrapSize: { width: 0, height: 0 },
      imgPosition: '',
      pointerPosition: { left: 0, bottom: 0 },
      imgSize: { width: 0, height: 0 },
    }
  },
  watch: {
    position(val) {
      this.imgPosition = {
        left: this.wrapSize.width * val.left,
        bottom: this.wrapSize.height * val.bottom,
      }
    },
  },
  methods: {
    dragStart(ev) {
      this.pointerPosition = { left: ev.layerX, bottom: this.imgSize.height - ev.layerY }
    },
    dragOver(ev) {
      ev.preventDefault()
    },
    drop(ev) {
      this.imgPosition = this.getPosition(ev)
      this.$emit('sign', {
        page: this.page,
        left: this.imgPosition.left / this.wrapSize.width,
        bottom: this.imgPosition.bottom / this.wrapSize.height,
      })
    },
    getWrapSize() {
      if (this.wrapSize.width && this.wrapSize.height) return
      this.wrapSize = { width: this.$refs.wrap.offsetWidth, height: this.$refs.wrap.offsetHeight }
      if (typeof this.position.left === 'number' && typeof this.position.bottom === 'number') {
        this.imgPosition = {
          left: this.wrapSize.width * this.position.left,
          bottom: this.wrapSize.height * this.position.bottom,
        }
      }
    },
    getImgSize(ev) {
      this.imgSize = { width: ev.offsetWidth, height: ev.offsetHeight }
    },
    getPosition(ev) {
      return {
        left: ev.layerX - this.pointerPosition.left,
        bottom: this.wrapSize.height - ev.layerY - this.pointerPosition.bottom,
      }
    },
    toPage(val) {
      this.page = val
    },
  },
}
</script>
