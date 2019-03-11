<template>
  <div class="page-container">
    <slot />
  </div>
</template>

<script>
import { TitleMixin } from 'extensions/TitleMixin'

export default {
  name: 'PageContainer',
  mixins: [TitleMixin],
  Props: {
    title: [String, Function],
  },
}
</script>
