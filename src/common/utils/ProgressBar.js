import Vue from 'vue'

export default class ProgressBar {
  static start() {
    if (Vue.prototype.progressBar) Vue.prototype.progressBar.start()
  }

  static end() {
    if (Vue.prototype.progressBar) Vue.prototype.progressBar.end()
  }
}
