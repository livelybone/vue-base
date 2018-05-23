<template>
  <div class="hello">
    <div @click="switchLang()">{{$t("chinese-traditional")}}</div>
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
    <div class="item">{{'2015-02-05T15:30:30' | datePipe({fmt:'YYYY-MM-DD HH:mm:ss.SSS'})}}</div>
    <div class="btn btn-blue">aa</div>
    <div @click="log('Div Click： ',$event.target)">
      <img-tag :src="require('assets/icon-search.png')"/>
    </div>
    <div>还剩 {{time}}</div>
    <input type="file" @change="input($event.target.files[0])">
    <no-result/>
    <pagination v-if="!isMobile()" :config="pageConfig" @to="log('Pagination page： ',$event)"/>
    <slide-for-more class="slide-for-more" v-else="" :searching="isSearching" contentMinHeight="100vh"
                    @slideUp="search">
      <div v-for="val in elements" class="element">Element</div>
    </slide-for-more>
  </div>
</template>

<script>
  import { timeConversion } from "utils/date-deal";
  import MY_URL from "utils/MY_URL";
  import { getUrl } from "utils/request-deal";
  import { mapActions } from 'vuex';
  import { isMobile } from "utils/user-agent";

  export default {
    name: 'HelloWorld',
    mounted() {
      setImmediate(() => this.snackBar.error('Hello World!'));
      const url = new MY_URL('http://@www.baidu.com:81/sdfs#1', true);
      url.setQuery('password', 1);
      console.log('MY_URL 对象： ', url, new URL('http://127.0.0.1:81/www.baidu.com:81?password=1'));
      console.log('getUrl 工具： ', getUrl('/user?user?', {p: 1, a: 11}));
      this.getUserInfo({}).then(res => console.log('全局 store.state.user.info :', JSON.parse(JSON.stringify(this.$store.state.user.info)))).catch(e => this.snackBar.error(e));
      console.log('全局 store.state.user.info :', JSON.parse(JSON.stringify(this.$store.state.user.info)));
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        pageConfig: {total: 1, pages: 10, page: 5, pageSize: 10},
        isSearching: false,
        convertTime: '2020-04-03',
        elements: [1, 1, 1,],
      }
    },
    computed: {
      time() {
        const obj = timeConversion(new Date(this.convertTime).getTime());
        return obj.day + '天' + obj.hour + '时' + obj.minute + '分' + obj.second + '秒'
      },
    },
    methods: {
      ...mapActions('user', ['getUserInfo']),
      input(file) {
        console.log('input File 值： ', file, typeof file);
      },
      isMobile,
      search() {
        this.log('slide up');
        this.isSearching = true;
        setTimeout(() => {
          this.elements.push(1);
          this.isSearching = false;
        }, 1000);
      },
      switchLang() {
        this.$i18n.locale = this.$i18n.locale === 'CN' ? 'CNT' : 'CN'
      }
    },
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../css/common-variable.scss';

  img {
    margin: .6rem 0 .4rem;
  }

  h1, h2 {
    margin: .1rem 0;
    @extend .title;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 .1rem;
  }

  a {
    @extend .content-4;
    color: #42b983;
  }

  .item {
    margin: 20px 0;
  }

  .element {
    @include flex(center);
    width: 100%;
    height: 1rem;
    background: #fff;

    &:nth-child(2n) {
      color: #fff;
      background: $green;
    }
  }
</style>
