<template>
  <input
    v-if="needCapture"
    type="file"
    accept="image/*"
    capture="camera"
    :id="id"
    @change="$emit('input', $event.target.files)"
    hidden
    multiple
  />
  <input
    v-else=""
    type="file"
    accept="image/jpeg,image/gif,image/png"
    :id="id"
    @change="$emit('input', $event.target.files)"
    hidden
  />
</template>

<script>
import { isAndroid, isWeiXin } from '@/common/utils/UserAgent'

export default {
  name: 'FileInput',
  props: {
    id: [String, Number],
  },
  data() {
    const needCapture = isWeiXin() && isAndroid()
    return {
      needCapture,
    }
  },
}
</script>
