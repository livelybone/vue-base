<template>
  <div v-if="progress" class="route-progress-bar">
    <div class="bar" :style="barStyle"></div>
  </div>
</template>

<script>
const fps = 50
const speed = {
  start: 100 / 3 / fps,
  end: (100 * 2) / fps,
}
export default {
  name: 'RouteProgressBar',
  data() {
    return {
      progress: 0,
      timer: null,
    }
  },
  computed: {
    barStyle() {
      return {
        width: `${this.progress}%`,
      }
    },
  },
  methods: {
    load(cb, isEnd) {
      if (this.timer) clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (!isEnd) {
          if (this.progress >= 80) clearInterval(this.timer)
          else this.progress += speed.start
        } else if (this.progress >= 100) {
          clearInterval(this.timer)
          if (typeof cb === 'function') cb()
        } else this.progress += speed.end
      }, 1000 / fps)
    },
    start() {
      this.show = true
      this.load()
    },
    end() {
      this.load(() => {
        this.show = false
        this.progress = 0
      }, true)
    },
  },
}
</script>

<style lang="scss">
.route-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 101;
  height: 0.03rem;
  background: rgba(#fff, 0.9);

  .bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: $blue-light;
  }
}
</style>
