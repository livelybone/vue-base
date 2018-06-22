<template>
  <div class="slide-for-more-base-wrap" @touchstart="start" @touchend="end" @touchmove="move">
    <div class="content" :class="searching?'transition':''"
         :style="{top:searching?'-'+tipHeight:-height+'px',minHeight:contentMinHeight}">
      <slot/>
    </div>
    <div class="tip-wrap" :class="searching?'transition':''"
         :style="{height:searching?tipHeight:height+'px'}">
      <slot name="tip"/>
    </div>
  </div>
</template>

<script>
import { getScroll } from 'utils/browser-default';

export default {
  name: 'SlideForMoreBase',
  props: {
    slideHeight: {
      default: 100,
      type: Number,
    },
    searching: Boolean,
    tipHeight: {
      type: String,
      default: '.4rem',
    },
    contentMinHeight: String,
  },
  data() {
    return {
      isBottom: false,
      startPointer: null,
      height: 0,
      dpr: typeof window !== 'undefined' ? window.devicePixelRatio : 1
    }
  },
  computed: {
    distance() {
      return this.slideHeight * this.dpr
    }
  },
  watch: {},
  methods: {
    start(ev) {
      this.isBottom = getScroll().top >= document.body.offsetHeight - screen.availHeight * this.dpr;
      // 上面的表达式有一定误差：手机浏览器可能会有状态栏。
      // 但是如果使用 document.documentElement.clientHeight，有些浏览器（比如UC）到达页面底部的时候，window.pageYOffset + document.documentElement.clientHeight 的值会小于 document.body.offsetHeight
      // => window.pageYOffset < document.body.offsetHeight - document.documentElement.clientHeight，导致无法触发 move 和 end
      this.startPointer = this.isBottom ? ev.changedTouches[0] : null;
    },
    move(ev) {
      if (!this.isBottom || this.searching) return;
      const height = this.startPointer.pageY - ev.changedTouches[0].pageY;
      if (height > 0) this.height = height;
    },
    end(ev) {
      if (!this.isBottom) return;
      const canEmit = this.distance <= this.startPointer.pageY - ev.changedTouches[0].pageY;
      if (canEmit) {
        this.$emit('slideUp');
      }
      this.height = 0;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../css/common-variable.scss';

.slide-for-more-base-wrap {
  position: relative;
  background: $background-1;

  .content {
    position: relative;
    z-index: 2;
    box-shadow: 0 .02rem .05rem rgba(#000, .05);
    background: $background;
  }

  .tip-wrap {
    @include flex(center);
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    line-height: .4rem;
    color: $black-lighter;
    overflow: hidden;
  }

  .transition {
    transition: all .5s cubic-bezier(0, 1, 1, 1); // 请看贝塞尔曲线 https://www.jianshu.com/p/d999f090d333
  }
}
</style>
