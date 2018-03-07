<template>
  <a :href="fileSrc" download="" target="download">
    <!--download, target属性必需-->
    {{showName ? filename : ''}}
    <slot/>
  </a>
</template>

<script>
  import { blobToURL } from 'utils/blob-url'

  export default {
    name: 'download',
    beforeMount() {
      this.convert(this.src)
    },
    destroyed() {
      if (this.revokeFn) this.revokeFn();
    },
    props: {
      showName: Boolean,
      src: {
        validator(val) {
          return !val || typeof val === 'string' || val instanceof FileList
        }
      }
    },
    data() {
      return {
        fileSrc: '',
        filename: '',
        revokeFn: null
      }
    },
    watch: {
      src(val) {
        this.convert(val)
      }
    },
    methods: {
      convert(val) {
        this.fileSrc = '';
        if (!val || typeof val === 'string') {
          this.fileSrc = val
        } else if (val instanceof FileList && val[0]) {
          this.filename = val[0].name;
          let blobUrl = blobToURL(val[0]);
          this.fileSrc = blobUrl.url;
          this.revokeFn = blobUrl.revokeFn();
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  @import '../../css/common-variable.scss';

  a {
    color: $blue
  }
</style>
