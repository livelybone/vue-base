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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '../../css/common-variable.scss';

.float-win {
  width: 20rem;
  border-radius: .03rem;
  box-shadow: 0 .025rem .1rem rgba(#000, .5);
  background: #fff;
  overflow: hidden;

  & h2 {
    width: 100%;
    line-height: .25rem;
    padding: 0 $margin;
    @extend .content-4;
    background: $background;
  }

  & .overlay-content {
    padding: .02rem $margin;

    & p {
      line-height: normal;
      @extend .content-4;
    }
  }

  & .btn-group {
    @include flex(center, center);

    & .btn {
      @include flex(center, center);
      flex: 1;
      width: 100%;
      height: .25rem;
      border-radius: 0;
      border: none;
      border-top: 1px solid $border;

      &:first-child {
        border-right: 1px solid $border;
      }

      &:hover {
        color: $blue !important;
        background: $background !important;
      }
    }
  }
}
</style>
