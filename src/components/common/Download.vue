<template>
  <a class="download-a" :href="fileSrc" download="" target="download">
    <!--download, target属性必需-->
    {{ showName ? filename : '' }}
    <slot />
  </a>
</template>

<script>
import { blobToBase64 } from 'base64-blob'

export default {
  name: 'Download',
  props: {
    showName: Boolean,
    src: {
      validator(val) {
        return !val || typeof val === 'string' || val instanceof FileList
      },
    },
  },
  data() {
    return {
      fileSrc: '',
      filename: '',
      revokeFn: null,
    }
  },
  watch: {
    src(val) {
      this.convert(val)
    },
  },
  methods: {
    convert(val) {
      this.fileSrc = ''
      if (!val || typeof val === 'string') {
        this.fileSrc = val
      } else if (val instanceof FileList && val[0]) {
        this.filename = val[0].name
        const blobUrl = blobToBase64(val[0])
        this.fileSrc = blobUrl.url
        this.revokeFn = blobUrl.revokeFn()
      }
    },
  },
  beforeMount() {
    this.convert(this.src)
  },
  destroyed() {
    if (this.revokeFn) this.revokeFn()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
a {
  color: $main;
}
</style>
