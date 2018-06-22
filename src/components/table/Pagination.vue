<template>
  <div class="pagination">
    <div class="page-btn" @click="prev">&lt;</div>
    <div v-for="(val,i) in pagesArr"
         :key="i"
         :class="[config.page===val?'active':'','page-btn',Number(val)?'':'disabled']"
         @click="to(val)">{{val}}
    </div>
    <div class="page-btn" @click="next">&gt;</div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  beforeMount() {
    this.initConfig();
  },
  props: {
    config: {
      default() {
        return {
          total: 1,
          pages: 1,
          page: 1,
          pageSize: 10,
          maxPageBtn: 7,
        };
      },
      type: Object,
    },
  },
  data() {
    return { num: 1, maxPageBtn: 7, pagesArr: [] };
  },
  watch: {
    config() {
      this.initConfig();
    },
  },
  methods: {
    initConfig() {
      this.num = this.config.page;
      this.maxPageBtn = this.config.maxPageBtn || this.maxPageBtn;
      if (this.config.pages <= this.maxPageBtn) {
        this.pagesArr = new Int8Array(this.config.pages).map((val, i) => i + 1);
      } else if (this.num <= (this.maxPageBtn + 1) / 2) {
        this.pagesArr = [...Array(this.maxPageBtn - 1)].map((val, i) => (i === this.maxPageBtn - 2 ? '...' : i + 1)).concat([this.config.pages]);
      } else if (this.num >= this.config.pages - (this.maxPageBtn - 1) / 2) {
        this.pagesArr = [1, '...'].concat([...Array(this.maxPageBtn - 2)].map((val, i) => this.config.pages - i)).reverse();
      } else {
        this.pagesArr = [1, '...'].concat([...Array(this.maxPageBtn - 4)].map((val, i) => this.num - Math.floor((this.maxPageBtn - 3) / 2) + i + 1)).concat(['...', this.config.pages]);
      }
    },
    next() {
      this.num += 1;
      if (this.num <= this.config.pages) {
        this.$emit('to', this.num);
      } else {
        this.num = this.config.pages;
      }
    },
    prev() {
      this.num -= 1;
      if (this.num > 0) {
        this.$emit('to', this.num);
      } else {
        this.num = 1;
      }
    },
    to(val) {
      const page = Number(val);
      if (page) this.$emit('to', page);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../css/common-variable.scss';

.pagination {
  @include flex(flex-end, center);

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
      background: #eee;
    }

    &.active {
      border: none;
      color: #fff;
      background: $blue;
    }
  }
}
</style>
