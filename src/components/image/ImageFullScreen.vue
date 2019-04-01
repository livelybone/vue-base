<template>
  <overlay v-show="!closed" class="image-full-screen" @click="close">
    <button class="btn btn-close" @click="close">X</button>
    <img-tag :src="img.value" />
    <div v-show="imgs.length > 1" class="operator">
      <button class="btn prev" @click="toPrev">{{ texts.pre }}</button>
      <button class="btn next" @click="toNext">{{ texts.next }}</button>
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
      this.texts = {
        pre: rest[0] || this.$t('image.pre'),
        next: rest[1] || this.$t('image.next'),
      }
      this.closed = false
      this.imgs = imgs
      this.index = index || 0
    },
    close() {
      this.closed = true
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.image-full-screen {
  .btn-close {
    @include subhead();
    position: fixed;
    right: 0.4rem;
    top: 0.4rem;
    width: 0.44rem;
    height: 0.44rem;
    color: rgba(#fff, 0.7);
    border: none;
    border-radius: 0.04rem;
    background: rgba(#000, 0.5);
    cursor: pointer;

    &:hover {
      color: rgba(#fff, 0.8);
      background: rgba(#000, 0.85);
    }
  }

  img {
    max-width: 90% !important;
    max-height: 90% !important;
  }

  .prev,
  .next {
    position: fixed;
    left: 0;
    top: 50%;
    width: 0.5rem;
    height: 0.6rem;
    border: none;
    color: $black-dark;
    background: rgba(#fff, 0.5);
    cursor: pointer;

    &:hover {
      background: rgba(#fff, 0.6);
    }
  }

  .next {
    left: auto;
    right: 0;
  }
}
</style>
