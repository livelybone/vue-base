<template>
  <div class="not-found">
    <h1>404</h1>
    <p>{{ $t('404.tip') }}</p>
    <div class="back btn btn-blue" @click="$router.back()">
      {{ $t('back') }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  metaInfo: {
    title: '404',
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.not-found {
  h1,
  p {
    text-align: center;
  }

  h1 {
    margin: 1.25rem 0 0.1rem;
    font-size: 0.48rem;
    font-weight: 400;
    letter-spacing: 0.001rem;
  }

  .back {
    width: 2rem;
    height: 0.3rem;
    margin: 0.5rem auto 0;
    text-align: center;
  }
}
</style>
