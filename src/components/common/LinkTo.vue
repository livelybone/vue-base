<template>
  <router-link class="link-to" v-bind="$attrs" :to="_to">
    <slot />
  </router-link>
</template>

<script>
export default {
  name: 'LinkTo',
  inheritAttrs: false,
  props: {
    to: {
      type: String,
    },
  },
  data() {
    return {}
  },
  computed: {
    _to() {
      return this.to.startsWith('/')
        ? `/${this.$i18n.locale}${this.to}`
        : this.to
    },
  },
}
</script>
