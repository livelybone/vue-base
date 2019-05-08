<template>
  <router-link class="link-to" :to="$_to">
    <slot />
  </router-link>
</template>

<script>
import { divRootUrl, joinWithRootUrl } from '@/common/utils/RequestInterceptor'

/**
 * Deal the link url in project
 * */
export default {
  name: 'LinkTo',
  props: {
    to: String,
  },
  computed: {
    $_to() {
      if (!this.to) return joinWithRootUrl(this.$i18n.locale)

      const url = this.to.toString()

      // If it's a absolute url, return
      if (!url.startsWith('/')) return this.to

      // If the params `lang` is not exist,
      // insert `i18n.locale` at the beginning of the url
      const [lang = ''] = url.split('/').filter(v => v)
      return this.$lang.langKeys.includes(lang.toLowerCase())
        ? url
        : joinWithRootUrl(this.$i18n.locale, divRootUrl(url))
    },
  },
}
</script>
