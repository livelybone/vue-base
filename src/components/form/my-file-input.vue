<template>
  <label v-if="canEdit" class="file-input" :for="id">
    <template v-if="!myValue">
      <img class="icon" :src="require('assets/icon-upload.png')" alt="">
      <span>点击拍照</span>
    </template>
    <template v-else="">
      <img-tag :src="myValue" alt="" @click="$emit('imgClick',myValue)"/>
      <img :src="require('assets/icon-edit.png')" alt="" class="edit">
    </template>
    <file-input :id="id" @input="input"/>
  </label>
  <img-tag class="img" v-else="" :src="myValue" @click="$emit('imgClick',myValue)"/>
</template>

<script>
  export default {
    name: 'MyFileInput',
    beforeMount() {
      this.myValue = this.value;
    },
    props: {
      id: [String, Number],
      value: [String, Number],
      canEdit: {
        default: true,
        type: Boolean
      },
    },
    data() {
      return {
        myValue: null,
      }
    },
    computed: {},
    watch: {
      value(val) {
        this.myValue = val;
      }
    },
    methods: {
      input(val) {
        if (val.length > 0) {
          this.myValue = val;
          this.$emit('input', val);
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../css/common-variable.scss';

  .file-input {
    @include flex(center,center,column);
    position: relative;
    width: 100%;
    height: 50vw;
    margin: 0 0 .1rem;
    border: 1px dashed $border;
    border-radius: .05rem;
    background: $background;
    cursor: pointer;
    overflow: hidden;

    & img.icon {
      max-width: 30%;
      max-height: 30%;
    }

    & span {
      padding: .1rem 0 0;
      color: $black-light;
    }

    & .edit {
      position: absolute;
      top: 0;
      right: 0;
      width: .3rem;
      padding: .04rem;
      background: rgba(#000, .5);
      cursor: pointer;
    }
  }

  .img {
    display: flex;
    width: 100%;
    margin: 0 0 .1rem;
  }
</style>
