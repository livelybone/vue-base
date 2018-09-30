<template>
  <input v-if="needCapture" type="file" accept='image/*' capture="camera" :id="id"
         @change="$emit('input',$event.target.files)" hidden
         multiple/>
  <input v-else="" type="file" accept='image/jpeg,image/gif,image/png' :id="id"
         @change="$emit('input',$event.target.files)"
         hidden/>
</template>

<script>
import { isAndroid, isWeiXin } from 'utils/user-agent'

export default {
  name: 'FileInput',
  mounted() {
  },
  props: {
    id: [String, Number],
  },
  data() {
    const needCapture = isWeiXin() && isAndroid()
    return {
      needCapture,
    }
  },
  computed: {},
  methods: {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../css/common-variable.scss';

</style>
