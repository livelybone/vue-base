<template>
  <input :type="config.inputType"
         :id="id"
         :value="value"
         :style="styles"
         :placeholder="config.placeholder"
         @input="input($event.target.value)">
</template>

<script>
export default {
  name: 'InputBase', // 适用于文本框
  mounted() {
  },
  props: {
    id: [String, Number],
    value: [String, Number],
    config: {
      default() {
        return {
          inputType: '',
          placeholder: '请输入',
          validateFn: () => true,
          required: true,
          needTrim: true,
        };
      },
      type: Object,
    },
    styles: Object,
  },
  data() {
    return {
      pristine: true,
      valid: true,
    };
  },
  computed: {},
  methods: {
    input(val) {
      this.pristine = false;
      this.valid = (val && !this.config.validateFn)
        || (val && this.config.validateFn && this.config.validateFn(val))
        || (this.config.required === false && !val);
      this.$emit('input', this.config.needTrim ? val.trim() : val);
      this.$emit('check', { pristine: this.pristine, valid: this.valid });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../css/common-variable.scss';

</style>
