<template>
  <slide-for-more-base
    class="slide-for-more-wrap"
    :slideHeight="slideHeight"
    :searching="searching"
    :contentMinHeight="contentMinHeight"
    tipHeight=".4rem"
    @slideUp="slideUp">
    <slot/>
    <div class="tip" slot="tip">
      <template v-if="searching">
        <loading class="loading" size=".2rem"/>
        正在获取...
      </template>
      <template v-else="">获取更多</template>
    </div>
  </slide-for-more-base>
</template>

<script>
import SlideForMoreBase from 'components/table/SlideForMoreBase';

export default {
  name: 'SlideForMore',
  props: {
    slideHeight: Number,
    searching: Boolean,
    contentMinHeight: String,
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    slideUp() {
      this.$emit('slideUp');
    },
  },
  components: { SlideForMoreBase },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../css/common-variable.scss';

.slide-for-more-wrap {
  .tip {
    @include flex(center);
    height: 100%;
    color: $black-lighter;

    .loading {
      margin: 0 .1rem 0 0;
    }
  }
}
</style>
