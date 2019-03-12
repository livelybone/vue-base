<template>
  <button class="back-wrap" @click="Back">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Back',
  serverCacheKey: () => 'back',
  data() {
    return {}
  },
  beforeDestroy() {},
  methods: {
    back() {
      this.$router.back()
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.back-wrap {
  @include flex(center, center);
  min-width: 0.22rem;
  min-height: 0.22rem;
}
</style>
