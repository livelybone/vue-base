<template>
  <overlay v-show="!closed" class="image-full-screen" @click="close">
    <span class="btn-close" @click="close">X</span>
    <img-tag :src="img.value" alt="" />
    <div v-show="imgs.length > 1" class="operator">
      <div class="prev" @click="toPrev">{{ texts.pre }}</div>
      <div class="next" @click="toNext">{{ texts.next }}</div>
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
      texts: {},
    }
  },
  computed: {
    img() {
      return this.imgs[this.index] || {}
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
    open({ imgs, index }, ...rest) {
      ;[
        this.texts.pre = this.$t('image.pre'),
        this.texts.next = this.$t('image.next'),
      ] = rest
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
.hide {
  display: none;
}

.btn-close {
  @include flex(center, center);
  position: fixed;
  right: 0.4rem;
  top: 0.4rem;
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 0.04rem;
  @extend .content-5;
  background: rgba(#fff, 0.75);
  cursor: pointer;

  &:hover {
    background: rgba(#fff, 0.85);
    color: $black-dark;
  }
}

img {
  max-width: 90% !important;
  max-height: 90% !important;
}

.prev,
.next {
  @include flex(center, center);
  position: fixed;
  left: 0;
  top: 50%;
  width: 0.6rem;
  height: 0.8rem;
  background: rgba(#fff, 0.75);
  cursor: pointer;

  &:hover {
    background: rgba(#fff, 0.85);
    color: $black-dark;
  }
}

.next {
  left: auto;
  right: 0;
}
</style>
