<template>
  <button class="back-wrap" @click="$router.back()">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Back',
  methods: {
    back() {
      this.$router.back()
    },
  },
}
</script>
