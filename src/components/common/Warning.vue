<template>
  <div class="warning" v-html="text"></div>
</template>

<script>
export default {
  name: 'Warning',
  props: ['text'],
  serverCacheKey: ({text}) => text,
  data() {
    return {};
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../css/common-variable.scss';

.warning {
  width: 100%;
  line-height: .24rem;
  padding: .07rem .4rem;
  border: 1px solid var(--yellow-light);
  background: var(--yellow-lighter) url('../../assets/icon-warning.png') no-repeat left .15rem top .1rem;
  background-size: .17rem;
}
</style>
