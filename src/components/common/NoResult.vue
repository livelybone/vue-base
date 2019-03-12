<template>
  <div class="no-result" @click="$emit('click', $event)">
    {{ tipText || $t('result.no') }}
  </div>
</template>

<script>
export default {
  name: 'NoResult',
  serverCacheKey: () => 'NoResult',
  props: {
    tipText: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.no-result {
  @include flex(center, center);
  width: 100%;
  height: 0.5rem;
  color: $black-light;
  text-align: center;
  text-decoration: underline;
  background: $background;
}
</style>
