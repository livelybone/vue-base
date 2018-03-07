<template>
  <div class="no-result" @click="$emit('click',$event)">{{tipText || '没有查询到内容！'}}</div>
</template>

<script>
  export default {
    name: 'no-result',
    props: {
      tipText: String
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  @import '../../css/common-variable.scss';

  .no-result {
    @include flex(center, center);
    width: 100%;
    height: .5rem;
    color: $black-light;
    text-align: center;
    text-decoration: underline;
    background: $background;
  }
</style>
