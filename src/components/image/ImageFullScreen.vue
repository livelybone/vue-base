<template>
  <overlay class="image-full-screen" v-if="!closed" @click="close">
    <span class="btn-close" @click="close">X</span>
    <img-tag :src="img.value" alt=""/>
    <div v-if="imgs.length>1" class="operator">
      <div class="prev" @click="toPrev">{{$t('image.pre')}}</div>
      <div class="next" @click="toNext">{{$t('image.next')}}</div>
    </div>
  </overlay>
</template>

<script>
export default {
  name: 'ImageFullScreen',
  data() {
    return {
      imgs: [],
      index: 0,
      closed: true,
    }
  },
  computed: {
    img() {
      return this.imgs[this.index]
    },
  },
  methods: {
    toPrev() {
      this.index -= 1
      if (this.index < 0) this.index = 0
    },
    toNext() {
      this.index += 1
      if (this.index >= this.imgs.length) this.index = this.imgs.length - 1
    },
    open({ imgs, index }) {
      this.closed = false
      this.imgs = imgs
      this.index = index
    },
    close() {
      this.closed = true
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../css/common-variable.scss';

.hide {
  display: none
}

.btn-close {
  @include flex(center, center);
  position: fixed;
  right: .4rem;
  top: .4rem;
  width: .6rem;
  height: .6rem;
  border-radius: .04rem;
  @extend .content-5;
  background: rgba(#fff, .75);;
  cursor: pointer;

  &:hover {
    background: rgba(#fff, .85);
    color: $black-dark;
  }
}

img {
  max-width: 90% !important;
  max-height: 90% !important;
}

.prev, .next {
  @include flex(center, center);
  position: fixed;
  left: 0;
  top: 50%;
  width: .6rem;
  height: .8rem;
  background: rgba(#fff, .75);;
  cursor: pointer;

  &:hover {
    background: rgba(#fff, .85);
    color: $black-dark;
  }
}

.next {
  left: auto;
  right: 0;
}
</style>
