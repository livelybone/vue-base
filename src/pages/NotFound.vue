<template>
  <page-container class="not-found" :title="404">
    <h1>404</h1>
    <p>{{$t('404.tip')}}</p>
    <div class="back btn btn-blue" @click="$router.back()">{{$t('back')}}</div>
  </page-container>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>
