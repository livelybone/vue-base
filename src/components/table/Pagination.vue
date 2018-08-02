<template>
  <div v-if="myConfig.pages>1" class="pagination">
    <div class="page-btn" :class="{disabled: myConfig.page<=1}" @click="prev">&lt;</div>
    <div v-for="(val,i) in pagesArr"
         :key="i"
         :class="[myConfig.page===val?'active':'','page-btn',Number(val)?'':'disabled']"
         @click="to(val)">{{val}}
    </div>
    <div class="page-btn" :class="{disabled: myConfig.page>=myConfig.pages}" @click="next">&gt;
    </div>
  </div>
</template>

<script>
const defaultFn = () => ({
  total: 1,
  pages: 1,
  page: 1,
  pageSize: 10,
  maxPageBtn: 7,
});

export default {
  name: 'Pagination',
  props: {
    config: {
      default() {
        return defaultFn();
      },
      type: Object,
    },
  },
  data() {
    return {};
  },
  computed: {
    myConfig() {
      return { ...defaultFn(), ...this.config };
    },
    pagesArr() {
      const { page, maxPageBtn, pages } = this.myConfig;
      if (pages <= maxPageBtn) {
        return new Int8Array(pages).map((val, i) => i + 1);
      }
      if (page <= (maxPageBtn + 1) / 2) {
        return [...Array(maxPageBtn - 1)].map((val, i) => (i === maxPageBtn - 2 ? '...' : i + 1)).concat([pages]);
      }
      if (page >= pages - (maxPageBtn - 1) / 2) {
        return [1, '...'].concat([...Array(maxPageBtn - 2)].map((val, i) => pages - i).reverse());
      }
      return [1, '...'].concat([...Array(maxPageBtn - 4)].map((val, i) => page - Math.floor((maxPageBtn - 3) / 2) + i + 1)).concat(['...', pages]);
    },
  },
  methods: {
    next() {
      let { page } = this.myConfig;
      const { pages } = this.myConfig;
      page += 1;
      if (page <= pages) {
        this.$emit('to', page);
      } else {
        page = pages;
      }
    },
    prev() {
      let { page } = this.myConfig;
      page -= 1;
      if (page > 0) {
        this.$emit('to', page);
      } else {
        page = 1;
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
      background: rgba($green, .3);
    }

    &.disabled {
      cursor: default;
      background: rgba(#000, .1);
      border-color: rgba($border, .1);
    }

    &.active {
      border: none;
      color: #fff;
      background: $green;
    }
  }
}
</style>
