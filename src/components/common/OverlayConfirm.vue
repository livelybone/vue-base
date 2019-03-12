<template>
  <overlay v-show="resolve" @click="hide">
    <div class="float-win" :style="{ width: winWidthC + 'px' }">
      <h2 v-show="headC">{{ headC }}</h2>
      <div class="overlay-content">
        <p v-show="!hideTipC">{{ tipTextC }}</p>
        <slot />
      </div>
      <div class="btn-group">
        <div class="btn btn-confirm" @click="resolve">{{ confirmTextC }}</div>
        <div class="btn btn-cancel" @click="hide">{{ cancelTextC }}</div>
      </div>
    </div>
  </overlay>
</template>

<script>
const props = {
  head: String,
  tipText: String,
  confirmText: String,
  cancelText: String,
  winWidth: Number,
  hideTip: Boolean,
}
export default {
  name: 'OverlayConfirm',
  props,
  data() {
    return {
      resolve: false,
      ...Object.keys(props).reduce((pre, k) => ({ ...pre, [`${k}C`]: '' }), {}),
    }
  },
  watch: {
    ...Object.keys(props).reduce(
      (pre, k) => ({
        ...pre,
        [k]() {
          this.init(this)
        },
      }),
      {},
    ),
  },
  methods: {
    init(options = {}) {
      Object.keys(props).forEach(k => {
        this[`${k}C`] = options[k] || ''
      })
    },
    show(options) {
      return new Promise(res => {
        const {
          tipText = this.$t('operate.confirm'),
          confirmText = this.$t('operate.ok'),
          cancelText = this.$t('operate.cancel'),
        } = options
        this.init({ ...options, tipText, confirmText, cancelText })
        this.resolve = res
      })
    },
    hide() {
      this.resolve = false
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.float-win {
  width: 3.6rem;
  max-width: calc(100vw - #{$margin} * 2);
  padding: $margin;
  text-align: left;
  border-radius: 0.03rem;
  box-shadow: 0 0.1rem 0.4rem rgba(#000, 0.5);
  background: #fff;
  overflow: hidden;

  h2 {
    @extend .content-5;
    width: 100%;
    padding: 0 0 0.05rem;
    line-height: 0.26rem;
    color: $font-dark;
  }

  .overlay-content {
    padding: 0.05rem 0 $margin;

    p {
      @extend .content-4;
      line-height: normal;
    }
  }

  .btn-group {
    @include flex(flex-end, center);
    margin: 0 -0.1rem -0.05rem 0;

    .btn-cancel,
    .btn-confirm {
      @include flex(center, center);
      height: 0.3rem;
      padding: 0 0.2rem;
      border-radius: 0;
      border: none;
      color: $main;

      &:hover {
        background: $background !important;
      }
    }

    .btn-cancel {
      color: $red;
    }
  }
}
</style>
