<template>
  <div class="btn" @click="getCode" :disabled="!!second||disabled">
    {{second ? second + $t('second') : text||$t('verify-code.get')}}
  </div>
</template>

<script>
import User from 'data/api/User'

export default {
  name: 'BtnCode',
  props: {
    type: {
      default: 'REGISTER', // 'REGISTER','FORGOT_PASSWORD'
      type: String,
    },
    getFrom: {
      required: true,
      type: [String, Number],
    },
    imgCode: String,
    text: String,
    disabled: Boolean,
  },
  data() {
    return {
      second: 0,
      timer: null,
    }
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer)
  },
  methods: {
    getCode() {
      if (this.disabled) this.$emit('disabled')
      else {
        User.getCode({ phoneNumber: this.getFrom, type: this.type })
          .then(() => {
            this.second = 60
            this.timer = setInterval(() => {
              this.second -= 1
              if (this.second <= 0 && this.timer) clearInterval(this.timer)
            }, 1000)
          })
          .catch(e => this.snackBar.error(e))
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '../../css/common-variable.scss';

.btn {
  position: absolute;
  right: 1px;
  top: 50%;
  min-width: .5rem;
  height: .2rem;
  border-radius: 0;
  padding: 0 .1rem;
  margin: -.1rem 0 0;
  color: $blue;
  border: none;
  border-left: 1px solid $border;

  &[disabled] {
    color: $black-light !important;
    background: #fff !important;
    border-left: 1px solid $border !important;
  }
}
</style>
