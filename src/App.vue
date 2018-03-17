<template>
  <div id="app">
    <snack-bar ref="snackBar"/>
    <image-full-screen ref="imgFull"/>
    <router-view/>
  </div>
</template>

<script>
  import SnackBar from 'components/snack-bar/SnackBar.vue'
  import ImageFullScreen from 'components/image/ImageFullScreen.vue'

  export default {
    name: 'app',
    mounted() {
      this.snackBar.listen(this.$refs.snackBar); // 监听bus=>snackBar事件
      this.imgFullScreen.listen(this.$refs.imgFull); // 监听bus=>imgFullScreen事件
    },
    components: {SnackBar, ImageFullScreen}
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
