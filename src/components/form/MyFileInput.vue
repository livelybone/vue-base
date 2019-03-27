<template>
  <label v-if="canEdit" class="my-file-input" :for="id">
    <template v-if="!myValue">
      <img
        class="icon"
        :src="require('@/assets/images/icon-upload.png')"
        alt=""
      />
      <span>{{ $t('take-photo') }}</span>
    </template>
    <template v-else="">
      <img-tag :src="myValue" alt="" @click="$emit('imgClick', myValue)" />
      <img
        :src="require('@/assets/images/icon-edit.png')"
        alt=""
        class="edit"
      />
    </template>
    <file-input :id="id" @input="input" />
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
