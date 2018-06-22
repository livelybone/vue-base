<template>
  <div class="check-box user-select-none" @click="input(value!=='checked'?'checked':'')"
       :style="styles">
    <span class="icon-checkbox-1" :class="value"
          :style="{width:checkboxSize,height:checkboxSize,margin:'0 .5rem 0 0'}"></span>{{name}}
  </div>
</template>

<script>
export default {
  name: 'CheckBox',
  props: {
    value: {
      default: '',
      validator(val) {
        const values = ['', 'checked', 'parts'];
        return values.includes(val);
      },
    },
    name: String,
    checkboxSize: { type: String, default: '14px' },
    styles: Object,
  },
  data() {
    return {};
  },
  methods: {
    input(val) {
      this.$emit('input', val);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../css/common-variable';

.check-box {
  @include flex(center);
  justify-content: flex-start;
  cursor: pointer;
}
</style>
