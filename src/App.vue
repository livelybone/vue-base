<template>
  <div id="app">
    <snack-bar ref="snackBar" baseSize="1rem"/>
    <image-full-screen ref="imgFull"/>
    <router-view/>
  </div>
</template>

<script>
import ImageFullScreen from 'components/image/ImageFullScreen'
import SnackBar from 'vuejs-snackbar'

export default {
  name: 'app',
  mounted() {
    this.snackBar.listen(this.$refs.snackBar) // 监听bus=>snackBar事件
    this.imgFullScreen.listen(this.$refs.imgFull) // 监听bus=>imgFullScreen事件
  },
  components: { SnackBar, ImageFullScreen },
}
</script>

<style lang="scss">
@import "./css/common.scss";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
