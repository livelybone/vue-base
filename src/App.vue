<template>
  <div id="app">
    <route-progress-bar ref="progressBar" />
    <snackbar ref="snackbar" baseSize="1rem" />
    <image-full-screen ref="imgFull" />
    <modal-confirm ref="confirmModal" />
    <router-view />
  </div>
</template>

<script>
import ImageFullScreen from '@/common/components/image/ImageFullScreen'
import ModalConfirm from '@/common/components/ModalConfirm'
import RouteProgressBar from '@/common/components/RouteProgressBar'
import {
  ConfirmModalRegister,
  ImgFullScreenRegister,
  ProgressbarRegister,
  SnackbarRegister,
} from '@/common/utils/SingtonCompsRegister'
import Snackbar from 'vuejs-snackbar'

export default {
  name: 'app',
  metaInfo() {
    return {
      titleTemplate(val) {
        return val ? `${val} - ${this.$t('title')}` : this.$t('title')
      },
    }
  },
  components: { RouteProgressBar, Snackbar, ImageFullScreen, ModalConfirm },
  created() {
    ProgressbarRegister(this, 'progressBar')
    SnackbarRegister(this, 'snackbar')
    ImgFullScreenRegister(this, 'imgFull')
    ConfirmModalRegister(this, 'confirmModal')
  },
}
</script>

<style lang="scss">
@import 'common/css/common';
</style>
