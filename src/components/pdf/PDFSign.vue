<template>
  <div class="pdf-sign-wrap">
    <span class="tip">拖动签章到裁决书相应位置，再点击确认盖章按钮，即完成签章！</span>
    <div class="pdf-wrap">
      <pdf-page class="pdf" :src="src" :page="page" @page-loaded="getWrapSize()" @toPage="toPage"/>
      <div class="sign-wrap" ref="wrap" @dragover="dragOver($event)" @drop="drop($event)">
        <img-tag v-if="!isNew&&imgPosition&&page===position.page"
                 :src="signature"
                 :style="{left:imgPosition.left+'px',bottom:imgPosition.bottom+'px'}"
                 @dragStart="dragStart($event)"/>
      </div>
      <div class="signature">
        <h2>签章</h2>
        <img-tag :src="signature"
                 @load="getImgSize($event)"
                 @dragStart="isNew = truedragStart($event)"
                 @dragEnd="isNew = false"/>
      </div>
    </div>
  </div>
</template>

<script>
import pdfPage from 'components/pdf/PDFPage';

export default {
  name: 'PDFSign',
  mounted() {
  },
  props: {
    src: {
      validator(val) {
        return !val || typeof val === 'string' || val instanceof Object || val instanceof FileList;
      },
    },
    signature: {
      validator(val) {
        return !val || typeof val === 'string' || val instanceof FileList;
      },
    },
    position: {
      default() {
        return { page: 1, left: undefined, bottom: undefined };
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
    };
  },
  watch: {
    position(val) {
      this.imgPosition = {
        left: this.wrapSize.width * val.left,
        bottom: this.wrapSize.height * val.bottom,
      };
    },
  },
  methods: {
    dragStart(ev) {
      this.pointerPosition = { left: ev.layerX, bottom: this.imgSize.height - ev.layerY };
    },
    dragOver(ev) {
      ev.preventDefault();
    },
    drop(ev) {
      this.imgPosition = this.getPosition(ev);
      this.$emit('sign', {
        page: this.page,
        left: this.imgPosition.left / this.wrapSize.width,
        bottom: this.imgPosition.bottom / this.wrapSize.height,
      });
    },
    getWrapSize() {
      if (this.wrapSize.width && this.wrapSize.height) return;
      this.wrapSize = { width: this.$refs.wrap.offsetWidth, height: this.$refs.wrap.offsetHeight };
      if (typeof this.position.left === 'number' && typeof this.position.bottom === 'number') {
        this.imgPosition = {
          left: this.wrapSize.width * this.position.left,
          bottom: this.wrapSize.height * this.position.bottom,
        };
      }
    },
    getImgSize(ev) {
      this.imgSize = { width: ev.offsetWidth, height: ev.offsetHeight };
    },
    getPosition(ev) {
      return {
        left: ev.layerX - this.pointerPosition.left,
        bottom: this.wrapSize.height - ev.layerY - this.pointerPosition.bottom,
      };
    },
    toPage(val) {
      this.page = val;
    },
  },
  components: { 'pdf-page': pdfPage },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../css/common-variable.scss';

.tip {
  display: block;
  width: 100%;
  line-height: .4rem;
  text-align: center;
}

.pdf-sign-wrap {
  @include flex-column(center, center);
  width: 100%;

  & .pdf-wrap {
    position: relative;
    z-index: 1;

    & .pdf {
      width: .78rem;

      &:last-of-type {
        margin: 0;
      }
    }

    & .dot {
      position: absolute;
      left: .3rem;
      bottom: .3rem;
      z-index: 1;
      width: .1rem;
      height: .1rem;
    }

    & .sign-wrap {
      position: absolute;
      left: .3rem;
      right: .3rem;
      top: .6rem;
      bottom: .3rem;

      & img {
        position: absolute;
        left: 0;
        bottom: 0;
        width: .8rem;
      }
    }

    & .signature {
      @include flex(center, center);
      position: absolute;
      right: .5rem;
      top: .8rem;
      z-index: 2;
      width: 1rem;
      height: 1rem;
      background: rgba(#000, .2);

      & h2 {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        padding: 0 .1rem;
        line-height: .24rem;
        @extend .content-2;
        color: #fff;
        background: rgba(#000, .3);
        pointer-events: none;
      }

      & img {
        position: relative;
        width: .8rem;
        cursor: pointer;
      }
    }
  }
}
</style>
