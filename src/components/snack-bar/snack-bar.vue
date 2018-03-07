<template>
  <div class="snack-bar-wrap">
    <div v-for="(msg,i) in msgs"
         class="snack-bar"
         :style="{background:msg.color}"
         @click="pop"
         v-html="getMsg(msg.msg)">
    </div>
  </div>
</template>

<script>
  const colors = {
    open: '#333',
    info: '#3DBD7D',
    error: '#fa7377',
    warn: '#FF6600'
  };
  export default {
    name: 'snack-bar',
    mounted() {
    },
    props: {
      colors: {
        default() {
          return colors
        },
        type: Object
      },
      holdTime: {
        default: 3000,
        type: Number
      },
      barStyle: Object,
      multiple: {
        default: true,
        type: Boolean
      }
    },
    data() {
      return {
        msgs: [],
        color: ''
      }
    },
    methods: {
      info(msg) {
        this.color = this.colors.info || colors.info;
        this.open({color: this.color, msg: msg})
      },
      error(msg) {
        this.color = this.colors.error || colors.error;
        this.open({color: this.color, msg: msg});
        this.redirect(msg);
        return false;
      },
      warn(msg) {
        this.color = this.colors.warn || colors.warn;
        this.open({color: this.color, msg: msg});
      },
      open(msg) {
        if (this.multiple) this.msgs.push(msg);
        else this.msgs = [msg];
        setTimeout(() => this.pop(), parseInt(this.holdTime));
      },
      pop() {
        this.msgs.splice(0, 1)
      },
      getMsg(msg) {
        if (typeof msg === 'string') return msg;
        if (msg.message) return msg.name + ': ' + msg.message
      },
      redirect(msg) {
        let m = msg.message || msg;
        if (m.indexOf('未登录') >= 0 && this.$route.path.indexOf('sign-in') < 0) {
          const isAdmin = this.$route.path.indexOf('admin') >= 0;
          this.$router.push(`${isAdmin ? '/admin' : ''}/sign-in?redirect=${encodeURIComponent(this.$route.fullPath)}`);
          this.$store.commit(isAdmin ? 'admin' : 'user', {})
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  @import '../../css/common-variable.scss';

  .snack-bar-wrap {
    @include flex(center, center);
    flex-wrap: wrap;
    position: fixed;
    left: 50%;
    top: .05rem;
    z-index: 1000;
    width: 0;

    & .snack-bar {
      @include flex(center, center);
      width: auto;
      min-width: 1rem;
      max-width: calc(100vw - .4rem);
      min-height: .5rem;
      padding: .1rem .2rem;
      margin: 0 0 .05rem;
      border-radius: .02rem;
      line-height: .2rem;
      color: #fff;
      background: $black-dark;
      box-shadow: 0 .01rem .025rem rgba(#000, .15);
      cursor: pointer;
    }
  }
</style>
