<template>
  <div class="not-found layout-container layout-content-card">
    <h1>404</h1>
    <p>{{ $t('404.tip') }}</p>
    <div class="back btn btn-main" @click="$router.back()">
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
<style lang="scss">
.not-found {
  margin: 0;

  h1,
  p {
    text-align: center;
  }

  h1 {
    padding: 1.25rem 0 0.1rem;
    font-size: 0.48rem;
    font-weight: 400;
    letter-spacing: 0.001rem;
  }

  .back {
    @include height(0.34rem, 0.32rem);
    display: block;
    width: 2rem;
    margin: 0.5rem auto 0;
    text-align: center;
  }
}
</style>
