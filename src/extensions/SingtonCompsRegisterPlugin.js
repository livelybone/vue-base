const SingletonCompsRegisterPlugin = {}
SingletonCompsRegisterPlugin.install = Vue => {
  const bus = new Vue()

  const snackBarInterceptor = msg => msg

  Vue.prototype.snackbar = {
    // see vuejs-snackbar
    open(msg) {
      return snackBarInterceptor(msg) && bus.$emit('snack-bar-open', msg)
    },
    info(msg) {
      return snackBarInterceptor(msg) && bus.$emit('snack-bar-info', msg)
    },
    error(msg) {
      return snackBarInterceptor(msg) && bus.$emit('snack-bar-error', msg)
    },
    warn(msg) {
      return snackBarInterceptor(msg) && bus.$emit('snack-bar-warn', msg)
    },
    listen(vm) {
      // vm: Instance of snackbar component
      bus.$on('snack-bar-open', msg => vm.open(msg))
      bus.$on('snack-bar-info', msg => vm.info(msg))
      bus.$on('snack-bar-error', msg => vm.error(msg))
      bus.$on('snack-bar-warn', msg => vm.warn(msg))
    },
  }

  Vue.prototype.imgFullScreen = {
    // see ImageFullScreen.vue
    open({ imgs, index, texts }) {
      bus.$emit('img-full-screen-open', { imgs, index, texts })
    },
    close() {
      bus.$emit('img-full-screen-close')
    },
    listen(vm) {
      // vm: Instance of ImageFullScreen component
      bus.$on('img-full-screen-open', data => vm.open(data))
      bus.$on('img-full-screen-close', () => vm.close())
    },
  }

  Vue.prototype.progressBar = {
    // see RouteProgressBar.vue
    start() {
      bus.$emit('progress-bar-start')
    },
    end() {
      bus.$emit('progress-bar-end')
    },
    listen(vm) {
      bus.$on('progress-bar-start', () => vm.start())
      bus.$on('progress-bar-end', () => vm.end())
    },
  }

  Vue.prototype.confirmOverlay = {
    // see OverlayConfirm.vue
    open({ head, tipText, confirmText, cancelText, winWidth, hideTip }) {
      return new Promise(res => {
        bus.$emit(
          'confirm-overlay-open',
          { head, tipText, confirmText, cancelText, winWidth, hideTip },
          res,
        )
      })
    },
    close() {
      bus.$emit('confirm-overlay-close')
    },
    listen(vm) {
      bus.$on('confirm-overlay-open', (options, callback) =>
        vm.open(options).then(callback),
      )
      bus.$on('confirm-overlay-close', () => vm.close())
    },
  }
}

export default SingletonCompsRegisterPlugin
