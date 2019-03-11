<template>
  <div class="pdf-page-wrap">
    <div class="btn-group">
      <span class="page">{{ page }}/{{ totalPage }}</span>
      <button @click="toPrev()">{{ $t('page.pre') }}</button>
      <button @click="toNext()">{{ $t('page.next') }}</button>
    </div>
    <pdf
      class="pdf"
      :src="pdfSrc"
      :page="page"
      @loaded="$emit('loaded')"
      @page-loaded="$emit('page-loaded')"
      @num-pages="totalPage = $event"
      @error="snackBar.error($event)"
    />
  </div>
</template>

<script>
import { blobToBase64 } from 'base64-blob'
import pdf from 'vue-pdf'

export default {
  name: 'PDFPage',
  components: { pdf },
  props: {
    src: {
      validator(val) {
        return !val || typeof val === 'string' || val instanceof Object || val instanceof FileList
      },
    },
    page: Number,
  },
  data() {
    return {
      numPages: null,
      pdfSrc: '',
      totalPage: 0,
    }
  },
  watch: {
    src(val) {
      this.convertSrc(val)
    },
  },
  methods: {
    convertSrc(val) {
      const src = val
      if (src instanceof FileList) {
        if (src[0]) {
          this.setImg(blobToBase64(src[0]))
        } else {
          this.pdfSrc = ''
        }
      } else {
        this.pdfSrc = src
      }
    },
    toPrev() {
      let page = this.page - 1
      if (page < 1) page = 1
      this.$emit('toPage', page)
    },
    toNext() {
      let page = this.page + 1
      if (page > this.totalPage) page = this.totalPage
      this.$emit('toPage', page)
    },
    setImg(blobUrl) {
      this.pdfSrc = blobUrl.url
    },
  },
  beforeMount() {
    this.convertSrc(this.src)
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../css/common-variable.scss';

.pdf-page-wrap {
  position: relative;
  width: 100%;
  padding: 0.6rem 0.3rem 0.3rem;
  background: #666;

  & .pdf {
    margin: 0 0 $margin;
    box-shadow: 0 0.05rem 0.1rem rgba(#000, 0.25);

    &:last-of-type {
      margin: 0;
    }
  }

  & .btn-group {
    @include flex(center, center);
    justify-content: flex-end;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    padding: 0 0.3rem;
    height: 0.4rem;
    background: rgba(#fff, 0.1);

    & .page {
      color: #fff;
    }

    & button {
      height: 0.24rem;
      margin: 0 0 0 0.2rem;
      line-height: normal;
      @extend .content-2;
    }
  }
}
</style>
