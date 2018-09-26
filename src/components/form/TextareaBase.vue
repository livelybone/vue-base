<template>
  <div class="textarea-wrap">
    <textarea :id="id"
              :value="myValue"
              :style="styles"
              :placeholder="config.placeholder"
              @input="input($event.target.value)"></textarea>
    <span v-if="config.maxLength" class="count">
      <span :class="myValue.length<config.maxLength?'font-blue':'font-red'">
        {{myValue.length}}</span>
      /{{config.maxLength}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'TextareaBase',
  mounted() {
    this.myValue = this.value
  },
  props: {
    id: [String, Number],
    value: [String, Number],
    config: {
      default() {
        return {
          maxLength: 100,
          placeholder: '请输入',
          validateFn: () => true,
          required: true,
          needTrim: true,
        }
      },
      type: Object,
    },
    styles: Object,
  },
  data() {
    return {
      myValue: '',
      pristine: true,
      valid: true,
    }
  },
  watch: {
    value(val) {
      this.myValue = val
    },
  },
  methods: {
    input(val) {
      this.myValue = val
      this.pristine = false
      this.valid = (val && this.config.validateFn && this.config.validateFn(val))
        || (this.config.required === false && !val)
      this.$emit('input', this.config.needTrim ? val.trim() : val)
      this.$emit('check', { pristine: this.pristine, valid: this.valid })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../css/common-variable.scss';

.textarea-wrap {
  @include flex-column(flex-start, flex-start);
  position: relative;
  width: 100%;

  & textarea {
    width: 100%;
    height: .6rem;
    padding: 0;
    line-height: .2rem;
  }

  & .count {
    position: absolute;
    right: 0;
    bottom: .08rem;
    @extend .content-1;
    color: $black-light;

    & span {
      @extend .content-1;
    }
  }
}
</style>
