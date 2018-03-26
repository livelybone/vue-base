<template>
  <img :src="img"
       :alt="alt"
       ref="image"
       @load="$emit('load',$event.target)"
       @click="stopDefault($event);$emit('click',$event)"
       @dragstart="$emit('dragStart',$event)"
       @dragend="$emit('dragEnd',$event)">
</template>

<script>
  import { blobToURL } from 'utils/blob-url'
  import { stopDefault } from "utils/browser-default";

  export default {
    name: 'ImgTag',
    mounted() {
      this.convert(this.src)
    },
    props: {
      defaultImg: String,
      src: {
        validator(val) {
          return !val || typeof val === 'string' || val instanceof FileList || val instanceof File || (val.url && val.needLogin)
        }
      },
      alt: String
    },
    data() {
      return {
        img: ''
      }
    },
    watch: {
      src(val) {
        this.convert(val)
      }
    },
    methods: {
      convert(val) {
        this.img = this.defaultImg;
        if (!val || typeof val === 'string') {
          this.img = val
        } else if (val instanceof FileList && val[0]) {
          this.setImg(blobToURL(val[0]));
        } else if (val instanceof File) {
          this.setImg(blobToURL(val));
        } else if (val.url && val.needLogin) {
          // 适用于获取的图片需要验证登录的情况
          this.$cache.getFile(val.url).then(blob => {
            this.setImg(blobToURL(blob));
          });
        }
      },
      stopDefault,
      setImg(blobUrl) {
        this.img = blobUrl.url;
        this.$refs.image.onload = blobUrl.revokeFn;
      }
    },
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../css/common-variable.scss';

  img {
    max-width: 100%;
    max-height: 100%;
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
