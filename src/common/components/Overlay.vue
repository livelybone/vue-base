<template>
  <div
    class="overlay-wrap"
    @click="$emit('click', $event)"
    @touchmove.stop.prevent=""
  >
    <div class="window" @click.stop.prevent="">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Overlay',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.overlay-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(#000, 0.85);
  text-align: center;
  line-height: 100vh;

  .overlay {
    display: inline-block;
    position: relative;
    max-width: 100%;
    max-height: 100%;
    text-align: initial;
    line-height: initial;
  }
}
</style>
