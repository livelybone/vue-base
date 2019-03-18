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
