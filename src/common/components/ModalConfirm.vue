<template>
  <overlay v-show="show" class="modal-confirm" @click="close">
    <h2 v-show="options.head">{{ options.head }}</h2>
    <div class="modal-content">
      <p v-show="!options.hideTip">{{ options.tipText }}</p>
      <slot />
    </div>
    <div class="btn-group">
      <button
        v-if="options.confirmText"
        class="btn btn-confirm"
        @click="confirm"
      >
        {{ options.confirmText }}
      </button>
      <button v-if="options.cancelText" class="btn btn-cancel" @click="close">
        {{ options.cancelText }}
      </button>
    </div>
  </overlay>
</template>

<script>
/**
 * @typedef Options
 * @property { String }     head
 * @property { Boolean }    hideTip
 * @property { String }     tipText
 * @property { Function }   confirmFn
 * @property { String }     confirmText
 * @property { Function }   cancelFn
 * @property { String }     cancelText
 * */
export default {
  name: 'ModalConfirm',
  data() {
    return {
      show: false,
      options: {},
    }
  },
  methods: {
    open(options) {
      const {
        tipText = this.$t('operate.confirm'),
        confirmText = this.$t('ok'),
        cancelText = this.$t('cancel'),
      } = options
      this.options = { ...options, tipText, confirmText, cancelText }
      this.show = true
    },
    close(ev) {
      if (this.option.cancelFn instanceof Function) this.option.cancelFn(ev)
      this.show = false
    },
    confirm(ev) {
      if (this.option.confirmFn instanceof Function) this.option.confirmFn(ev)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.modal-confirm {
  .window {
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

    .modal-content {
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
          background: $bg !important;
        }
      }

      .btn-cancel {
        color: $red;
      }
    }
  }
}
</style>
