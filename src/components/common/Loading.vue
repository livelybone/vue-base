<template>
  <div class="loading-wrap" :style="myStyle">
    <span v-for="(val,i) in [...Array(10)]" :class="['circle','circle-'+i]"></span>
  </div>
</template>

<script>
  export default {
    name: 'Loading',
    props: {
      size: [Number, String],
    },
    data() {
      return {}
    },
    computed: {
      myStyle() {
        if (!this.size) return {};
        const size = typeof this.size === 'number' ? this.size + 'px' : this.size;
        return {width: size, height: size}
      }
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  @import '../../css/common-variable.scss';

  .loading-wrap {
    position: relative;
    width: 1rem;
    height: 1rem;

    .circle {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 15%;
        height: 15%;
        margin: -7.5% 0 0;
        border-radius: 50%;
        background: $black-lighter;
        animation: sk-circleFadeDelay 1s infinite ease-in-out both;
      }
    }

    @for $i from 0 through 9 {
      .circle-#{$i} {
        transform: rotate(calc((#{$i} + 1) * 360deg / 9));

        &:before {
          content: '';
          animation-delay: #{-1+($i + 1)* .1}s;
        }
      }
    }
  }

  @keyframes sk-circleFadeDelay {
    @for $i from 0 through 9 {
      #{($i+1)*10}% {
        opacity: #{.1 * ($i+1)};
      }
    }
  }
</style>
