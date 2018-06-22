<template>
  <div class="date-wrap">
    <label :for="id" :style="labelStyle"
           :class="myValue?'name':''">{{myValue||'请选择时间'}}</label>
    <input v-if='canEdit'
           class="date"
           :type="config.inputType"
           :id="id"
           :placeholder="config.placeholder"
           @input="input($event.target.value)">
  </div>
</template>

<script>
import { dateFormat } from 'utils/date-deal';

const datesType = [
  { name: 'date', format: 'y-m-d' },
  { name: 'datetime', format: 'y-m-d h:M' },
  { name: 'datetime-local', format: 'y-m-d h:M' },
  { name: 'month', format: 'y-m' },
  { name: 'week', format: 'y-m-d h:M' },
  { name: 'time', format: 'y-m-d h:M' },
];

export default {
  name: 'Datepicker',
  beforeMount() {
    this.myValue = this.value;
  },
  props: {
    id: [String, Number],
    value: [String, Number],
    config: {
      default() {
        return {
          inputType: '',
          required: true,
        };
      },
      type: Object,
    },
    canEdit: {
      default: true,
      type: Boolean,
    },
    labelStyle: Object,
  },
  data() {
    return { myValue: '' };
  },
  computed: {
    dateObj() {
      return datesType.find(type => type.name === this.config.inputType);
    },
  },
  watch: {
    value(val) {
      if (val) this.myValue = val;
    },
  },
  methods: {
    input(val) {
      this.myValue = dateFormat(val, this.dateObj.format);
      this.$emit('input', this.myValue);
    },
    dateFormat,
  },
  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../css/common-variable.scss';

.date-wrap {
  @include flex();
  flex: 1;
  position: relative;
  width: 100%;
  height: .4rem;

  & label {
    display: block;
    width: 100%;
    color: $black-lighter;

    &.name {
      color: $black;
    }
  }

  & .date {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    /*opacity: 0;*/
  }
}
</style>
