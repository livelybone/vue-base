import Vue from 'vue'

const snackBarInterceptor = msg => (typeof msg === 'object' ? msg.message : msg)

/**
 * @param { VueComponent }      app   instance of App.vue
 * @param { String }            ref   ref string of the component
 * */
export function SnackbarRegister(app, ref) {
  Vue.prototype.snackbar = {
    async open(msg) {
      await (snackBarInterceptor(msg) &&
        new Promise(res => {
          Vue.nextTick(() => {
            if (app.$refs[ref]) res(app.$refs[ref].open(msg))
          })
        }))
    },
    async info(msg) {
      await (snackBarInterceptor(msg) &&
        new Promise(res => {
          Vue.nextTick(() => {
            if (app.$refs[ref]) res(app.$refs[ref].info(msg))
          })
        }))
    },
    async error(msg) {
      await (snackBarInterceptor(msg) &&
        new Promise(res => {
          Vue.nextTick(() => {
            if (app.$refs[ref]) res(app.$refs[ref].error(msg))
          })
        }))
    },
    async warn(msg) {
      await (snackBarInterceptor(msg) &&
        new Promise(res => {
          Vue.nextTick(() => {
            if (app.$refs[ref]) res(app.$refs[ref].warn(msg))
          })
        }))
    },
  }
}

/**
 * @param { VueComponent }      app   instance of App.vue
 * @param { String }            ref   ref string of the component
 * */
export function ImgFullScreenRegister(app, ref) {
  Vue.prototype.imgFullScreen = {
    open({ imgs, index, texts }) {
      Vue.nextTick(() => {
        if (app.$refs[ref]) app.$refs[ref].open({ imgs, index, texts })
      })
    },
    close() {
      Vue.nextTick(() => {
        if (app.$refs[ref]) app.$refs[ref].close()
      })
    },
  }
}

/**
 * @param { VueComponent }      app   instance of App.vue
 * @param { String }            ref   ref string of the component
 * */
export function ProgressbarRegister(app, ref) {
  Vue.prototype.progressBar = {
    start() {
      Vue.nextTick(() => {
        if (app.$refs[ref]) app.$refs[ref].start()
      })
    },
    end() {
      Vue.nextTick(() => {
        if (app.$refs[ref]) app.$refs[ref].end()
      })
    },
  }
}

/**
 * @param { VueComponent }      app   instance of App.vue
 * @param { String }            ref   ref string of the component
 * */
export function ConfirmModalRegister(app, ref) {
  Vue.prototype.confirmModal = {
    open(options = {}) {
      Vue.nextTick(() => {
        if (app.$refs[ref]) app.$refs[ref].open(options)
      })
    },
    close() {
      Vue.nextTick(() => {
        if (app.$refs[ref]) app.$refs[ref].close()
      })
    },
  }
}
