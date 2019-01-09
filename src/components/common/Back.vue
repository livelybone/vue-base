<template>
  <button class="back-wrap" @click="Back">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'Back',
  data() {
    return {}
  },
  beforeDestroy() {
  },
  methods: {
    back() {
      this.$router.back()
    },
  },
}
</script>
