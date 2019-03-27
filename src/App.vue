<template>
  <div id="app">
    <snack-bar ref="snackBar" baseSize="1rem" position="top-right" />
    <image-full-screen ref="imgFull" />
    <overlay-confirm ref="confirmOverlay" />
    <router-view />
  </div>
</template>

<script>
import OverlayConfirm from '@/components/common/OverlayConfirm'
import ImageFullScreen from '@/components/image/ImageFullScreen'
import Vue from 'vue'
import SnackBar from 'vuejs-snackbar'

export default {
  name: 'app',
  metaInfo() {
    return {
      titleTemplate(val) {
        return val ? `${val} - ${this.$t('title')}` : this.$t('title')
      },
      link: [{ type: 'shortcut icon', href: 'sfsdfsdfsdf' }],
    }
  },
  components: { SnackBar, ImageFullScreen, OverlayConfirm },
  mounted() {
    Vue.prototype.snackBar = this.$refs.snackBar
    Vue.prototype.imgFullScreen = this.$refs.imgFull
    Vue.prototype.confirmOverlay = this.$refs.confirmOverlay
  },
}
</script>
