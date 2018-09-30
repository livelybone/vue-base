<template>
  <div class="container">
    <h1>404</h1>
    <p>找不到网页了！</p>
    <div class="back btn btn-blue" @click="$router.back()">返回</div>
  </div>
</template>

<script>
import { titleMixin } from 'extensions/title-mixin'

export default {
  name: 'NotFound',
  mixins: [titleMixin],
  title: '404',
  data() {
    return {}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  color: #666;
}

h1, p {
  text-align: center;
}

h1 {
  margin: 1.25rem 0 .1rem;
  font-size: .48rem;
  font-weight: 400;
  letter-spacing: .001rem;
}

.back {
  width: 2rem;
  height: .3rem;

  margin: .5rem auto 0;
  text-align: center;
}
</style>
