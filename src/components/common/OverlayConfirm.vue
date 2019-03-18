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
