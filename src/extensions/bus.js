// 事件总线
import Vue from 'vue'

export default function initialBus () {
  const bus = new Vue();

  Vue.prototype.bus = bus;

  Vue.prototype.snackBar = {
    open (msg) {
      bus.$emit('snack-bar-open', msg)
    },
    info (msg) {
      bus.$emit('snack-bar-info', msg)
    },
    error (msg) {
      bus.$emit('snack-bar-error', msg)
    },
    warn (msg) {
      bus.$emit('snack-bar-warn', msg)
    },
    listen (vm) {
      // vm: snackBar实例
      bus.$on('snack-bar-open', msg => {
        vm.open(msg)
      });
      bus.$on('snack-bar-info', msg => {
        vm.info(msg)
      });
      bus.$on('snack-bar-error', msg => {
        vm.error(msg)
      });
      bus.$on('snack-bar-warn', msg => {
        vm.warn(msg)
      })
    }
  };

  Vue.prototype.imgFullScreen = {
    open ({imgs, index}) {
      bus.$emit('img-full-screen-open', {imgs, index})
    },
    close () {
      bus.$emit('img-full-screen-close')
    },
    listen (vm) {
      // vm: snackBar实例
      bus.$on('img-full-screen-open', ({imgs, index}) => {
        vm.open({imgs, index})
      });
      bus.$on('img-full-screen-close', () => {
        vm.close()
      })
    }
  }
}
