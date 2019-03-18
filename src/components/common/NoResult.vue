<template>
  <div class="no-result" @click="$emit('click', $event)">
    {{ tipText || $t('result.no') }}
  </div>
</template>

<script>
export default {
  name: 'NoResult',
  props: {
    tipText: String,
  },
}
</script>
