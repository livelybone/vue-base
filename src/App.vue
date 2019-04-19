<template>
  <div id="app">
    <route-progress-bar ref="progressBar" />
    <snack-bar ref="snackBar" baseSize="1rem" position="top-right" />
    <image-full-screen ref="imgFull" />
    <overlay-confirm ref="confirmOverlay" />
    <router-view />
  </div>
</template>

<script>
import OverlayConfirm from '@/components/common/OverlayConfirm'
import RouteProgressBar from '@/components/common/RouteProgressBar'
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
    }
  },
  components: { RouteProgressBar, SnackBar, ImageFullScreen, OverlayConfirm },
  mounted() {
    this.progressBar.listen(this.$refs.progressBar)
    this.snackbar.listen(this.$refs.snackbar)
    this.imgFullScreen.listen(this.$refs.imgFull)
    this.confirmOverlay.listen(this.$refs.confirmOverlay)
    this.imgFullScreen.open({
      imgs: [
        { value: require('@/assets/images/logo.png') },
        { value: require('@/assets/images/logo.png') },
      ],
    })
  },
}
</script>

<style lang="scss">
@import './css/common.scss';
@import '../node_modules/vue-slide-for-more/lib/css/index';
</style>
