<template>
  <overlay v-show="show" class="modal" @click="close">
    <h2 class="title">
      {{ title }} <span class="icon icon-close" @click="close">X</span>
    </h2>
    <div class="modal-content">
      <slot />
    </div>
  </overlay>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: String,
  },
  data() {
    return {
      show: false,
      options: {},
    }
  },
  methods: {
    open() {
      this.show = true
    },
    close() {
      this.show = false
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.modal {
  .window {
    border-radius: 0.05rem;
    background: #fff;
  }

  .title {
    @include height(0.5rem);
    @include subhead();
    width: 100%;
    padding: 0 0.2rem;

    .icon {
      float: right;
      margin: 0 -0.2rem 0 0;
      padding: 0 0.2rem;
      cursor: pointer;
    }
  }

  .modal-content {
    padding: 0.2rem;
    border-radius: inherit;
    background: $bg;
  }
}
</style>
