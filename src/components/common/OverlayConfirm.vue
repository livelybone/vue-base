<template>
  <overlay @click="$emit('close')">
    <div class="float-win" :style="{width:winWidth+'px'}">
      <h2 v-if="head">{{head}}</h2>
      <div class="overlay-content">
        <p v-if="!hideTip">{{tipText || $t('operate.sure')}}</p>
        <slot/>
      </div>
      <div class="btn-group">
        <div class="btn" @click="$emit('confirm')">{{confirmText || $t('ok')}}</div>
        <div class="btn" @click="$emit('cancel')">{{cancelText || $t('cancel')}}</div>
      </div>
    </div>
  </overlay>
</template>

<script>
export default {
  name: 'OverlayConfirm',
  props: {
    head: String,
    tipText: String,
    confirmText: String,
    cancelText: String,
    winWidth: Number,
    hideTip: Boolean,
  },
}
</script>
