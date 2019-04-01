<template>
  <overlay v-show="resolve" class="overlay-confirm" @click="hide">
    <div class="float-win" :style="{ width: winWidthC + 'px' }">
      <h2 v-show="headC">{{ headC }}</h2>
      <div class="overlay-content">
        <p v-show="!hideTipC">{{ tipTextC }}</p>
        <slot />
      </div>
      <div class="btn-group">
        <button class="btn btn-confirm" @click="resolve">
          {{ confirmTextC }}
        </button>
        <button class="btn btn-cancel" @click="hide">{{ cancelTextC }}</button>
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
          confirmText = this.$t('ok'),
          cancelText = this.$t('cancel'),
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
<style lang="scss">
.overlay-confirm {
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
      @include subhead();
      width: 100%;
      padding: 0 0 0.05rem;
      line-height: 0.26rem;
      color: $font-dark;
    }

    .overlay-content {
      padding: 0.05rem 0 $margin;

      p {
        line-height: normal;
      }
    }

    .btn-group {
      margin: 0 -0.1rem -0.05rem 0;
      overflow: hidden;

      .btn-cancel,
      .btn-confirm {
        float: right;
        height: 0.3rem;
        padding: 0 0.2rem;
        border-radius: 0;
        border: none;
        color: $main;
        background: transparent;

        &:hover {
          background: $background !important;
        }
      }

      .btn-cancel {
        color: $red;
      }
    }
  }
}
</style>
