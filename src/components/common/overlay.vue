<template>
  <div class="overlay-wrap" @click="$emit('click',$event)" @touchmove="stopDefault">
    <div class="overlay" @click="stopDefault">
      <slot/>
    </div>
  </div>
</template>

<script>
  import { stopDefault } from 'utils/broswer-default'

  export default {
    name: 'overlay',
    data() {
      return {}
    },
    methods: {
      stopDefault
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  @import '../../css/common-variable.scss';

  .overlay-wrap {
    @include flex(center, center);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    background: rgba(#000, .85);

    & .overlay {
      max-width: 100%;
      max-height: 100%;
      @include flex(center, center);
    }
  }
</style>
