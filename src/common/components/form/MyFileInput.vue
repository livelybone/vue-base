<template>
  <label v-if="canEdit" class="my-file-input" :for="id">
    <template v-if="!myValue">
      <img
        class="icon"
        :src="require('@/common/images/icon-upload.png')"
        alt=""
      />
      <span>{{ $t('take-photo') }}</span>
    </template>
    <template v-else="">
      <img-tag :src="myValue" alt="" @click="$emit('imgClick', myValue)"/>
      <img
        :src="require('@/common/images/icon-edit.png')"
        alt=""
        class="edit"
      />
    </template>
    <file-input :id="id" @input="input"/>
  </label>
  <img-tag
    class="img"
    v-else=""
    :src="myValue"
    @click="$emit('imgClick', myValue)"
  />
</template>

<script>
export default {
  name: 'MyFileInput',
  props: {
    id: [String, Number],
    value: [String, Number],
    canEdit: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      myValue: null,
    }
  },
  watch: {
    value(val) {
      this.myValue = val
    },
  },
  methods: {
    input(val) {
      if (val.length > 0) {
        this.myValue = val
        this.$emit('input', val)
      }
    },
  },
  beforeMount() {
    this.myValue = this.value
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.my-file-input {
  .file-input {
    position: relative;
    width: 100%;
    height: 50vw;
    margin: 0 0 0.1rem;
    text-align: center;
    border: 1px dashed $border;
    border-radius: 0.05rem;
    background: $bg;
    cursor: pointer;
    overflow: hidden;

    .icon {
      max-width: 30%;
      max-height: 30%;
    }

    span {
      padding: 0.1rem 0 0;
      color: $black-light;
    }

    .edit {
      position: absolute;
      top: 0;
      right: 0;
      width: 0.3rem;
      padding: 0.04rem;
      background: rgba(#000, 0.5);
      cursor: pointer;
    }
  }

  .img {
    width: 100%;
    margin: 0 0 0.1rem;
  }
}
</style>
