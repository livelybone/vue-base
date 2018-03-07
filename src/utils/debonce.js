export default class debonceTime {
  timer = null;
  time = 500;

  constructor(time) {
    this.time = time || 500
  }

  handle(callback) {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      callback()
    }, this.time)
  }
}
