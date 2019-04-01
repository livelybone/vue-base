<template>
  <div class="hello-world">
    <select :value="$i18n.locale" @change="switchLang($event.target.value)">
      <option v-for="op in $lang.langOptions" :value="op.value" :key="op.value">
        {{ op.name }}
      </option>
    </select>
    <img-tag :src="require('@/assets/images/logo.png')" />
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank">Community Chat</a>
      </li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br />
      <li>
        <a href="http://vuejs-templates.github.io/webpack/" target="_blank">
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li>
        <a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank">
          awesome-vue
        </a>
      </li>
    </ul>
    <div class="item">
      {{ '2015-02-05T15:30:30' | datePipe('YYYY-MM-DD HH:mm:ss.SSS') }}
    </div>
    <div class="btn btn-blue">aa</div>
    <div @click="log('Div Click： ', $event.target)">
      <img-tag :src="require('@/assets/images/icon-search.png')" />
    </div>
    <div>{{ $t('remain') }} {{ time }}</div>
    <input type="file" @change="input($event.target.files[0])" />
    <no-result />
    <router-link to="/a">to</router-link>
    <pagination
      v-if="!isMobile"
      :config="pageConfig"
      @to="
        log('Pagination page： ', $event)
        pageConfig.page = $event
      "
    />
    <slide-for-more
      v-else=""
      class="slide-for-more"
      :isSearching="isSearching"
      contentMinHeight="100vh"
      tipHeight=".4rem"
      @slideUp="search"
      @slideDown="search"
    >
      <div v-for="(val, i) in elements" :key="i" class="element">
        Element{{ val }}
      </div>
    </slide-for-more>
  </div>
</template>

<script>
import { getUrl } from '@/utils/RequestInterceptor'
import { mapActions } from 'vuex'

export default {
  name: 'HelloWorld',
  components: {},
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      pageConfig: {
        total: 1,
        pages: 10,
        page: 5,
        pageSize: 10,
      },
      isSearching: false,
      convertTime: '2020-04-03',
      elements: [1, 1, 1],
    }
  },
  computed: {
    time() {
      const { day, hour, minute, second } = this.timeConversion(
        new Date(this.convertTime).getTime(),
      )
      return `${day} ${this.$t('day')} ${hour} ${this.$t('hour')} ${minute}
       ${this.$t('minute')} ${second} ${this.$t('second')}`
    },
  },
  methods: {
    ...mapActions('user', ['getUserInfo']),
    input(file) {
      console.log('input File 值： ', file, typeof file)
    },
    search() {
      this.log('slide up')
      this.isSearching = true
      setTimeout(() => {
        this.elements.push(1)
        this.isSearching = false
      }, 1000)
    },
  },
  mounted() {
    setTimeout(() => {
      this.snackBar.error('Hello World!')
      this.confirmOverlay.show({ head: 'Hello World!' }).then(() => {
        this.confirmOverlay.hide()
      })
    }, 1000)
    console.log('getUrl 工具： ', getUrl('/user?user?', { p: 1, a: 11 }))
    this.getUserInfo({})
      .then(() =>
        console.log(
          '全局 store.state.user.info :',
          JSON.parse(JSON.stringify(this.$store.state.user.info)),
        ),
      )
      .catch(e => {
        this.snackBar.error(e)
      })
    console.log(
      '全局 store.state.user.info :',
      JSON.parse(JSON.stringify(this.$store.state.user.info)),
    )
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.hello-world {
  text-align: center;

  select {
    display: block;
    margin: 0 auto;
  }

  img {
    margin: 0.6rem 0 0.4rem;
  }

  h1,
  h2 {
    @include title();
    margin: 0.1rem 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 0.1rem;
  }

  a {
    color: #42b983;
  }

  .item {
    margin: 20px 0;
  }

  .element {
    @include height(1rem);
    width: 100%;
    background: #fff;

    &:nth-child(2n) {
      color: #fff;
      background: $green;
    }
  }
}
</style>
