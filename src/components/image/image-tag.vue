<template>
  <img :src="img"
       :alt="alt"
       @load="$emit('load',$event.target)"
       @click.stop.prevent="$emit('click',$event)"
       @dragstart="$emit('dragStart',$event)"
       @dragend="$emit('dragEnd',$event)">
</template>

<script>
  import { blobToDataURL } from 'utils/blob-base64'

  export default {
    name: 'image-tag',
    beforeMount() {
      this.convert(this.src)
    },
    props: {
      defaultImg: String,
      src: {
        validator(val) {
          return !val || typeof val === 'string' || val instanceof FileList
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
          blobToDataURL(val[0], file => {
            this.img = file
          })
        }
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
