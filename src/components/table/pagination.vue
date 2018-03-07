<template>
  <div class="pagination">
    <div class="page-btn" @click="prev"><</div>
    <div v-for="(i,k) in new Array(config.pages)" :class="config.page===k+1?'page-btn active':'page-btn'"
         @click="to($event.target.innerHTML)">{{k + 1}}
    </div>
    <div class="page-btn" @click="next">></div>
  </div>
</template>

<script>
  export default {
    name: 'pagination',
    beforeMount() {
      this.num = this.config.page
    },
    props: {
      config: {
        default() {
          return {
            total: 1,
            pages: 1,
            page: 1,
            pageSize: 10
          }
        },
        type: Object
      }
    },
    data() {
      return {num: 1}
    },
    watch: {
      config(val) {
        this.num = this.config.page
      }
    },
    methods: {
      next() {
        this.num++;
        if (this.num <= this.config.pages) {
          this.$emit('to', this.num)
        } else {
          this.num = this.config.pages
        }
      },
      prev() {
        this.num--;
        if (this.num > 0) {
          this.$emit('to', this.num)
        } else {
          this.num = 1
        }
      },
      to(val) {
        let page = Number(val);
        this.$emit('to', page)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../css/common-variable.scss';

  .pagination {
    @include flex();
    align-items: center;
    justify-content: flex-end;

    & .page-btn {
      @include flex(center, center);
      width: .28rem;
      height: .28rem;
      margin: 0 0 0 .10rem;
      border: 1px solid $border;
      cursor: pointer;

      &:hover {
        background: #eee;
      }

      &.disabled {
        cursor: default;
      }

      &.active {
        border: none;
        color: #fff;
        background: $blue;
      }
    }
  }
</style>
