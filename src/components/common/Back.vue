<template>
  <div class="back-wrap" @click="Back">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Back',
  serverCacheKey: () => 'back',
  data() {
    return {};
  },
  beforeDestroy() {
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '../../css/common-variable.scss';

.back-wrap {
  @include flex(center, center);
  min-width: .22rem;
  min-height: .22rem;
}
</style>
