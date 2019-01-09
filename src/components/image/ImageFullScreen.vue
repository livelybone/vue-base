<template>
  <overlay class="image-full-screen" v-if="!closed" @click="close">
    <span class="btn-close" @click="close">X</span>
    <img-tag class="full-img" :src="img.value" alt=""/>
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
