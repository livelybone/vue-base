<template>
  <div class="hello">
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
    <div @click="log($event.target)">
      <img-tag :src="require('assets/icon-search.png')"/>
    </div>
    <div>还剩 {{time('2018-06-04')}}</div>
    <input type="file" @change="input($event.target.files[0])">
    <no-result/>
    <pagination :config="pageConfig" @to="log"/>
  </div>
</template>

<script>
  import { timeConversion } from "utils/date-deal";
  import { MY_URL } from "@/utils/request-deal";

  export default {
    name: 'HelloWorld',
    mounted() {
      setImmediate(() => this.snackBar.error('Hello World!'));
      this.$http.get('/sign-in').then(res => console.log(res)).catch(e => {
        console.log(e);
        this.snackBar.error(e)
      });
      const url = new MY_URL(window.location.href + '?username=aa&password=11#aa');
      console.log(new URL(window.location.href + '?username=aa&password=11'), window.location, url);
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        pageConfig: {total: 1, pages: 10, page: 5, pageSize: 10},
      }
    },
    methods: {
      time(val) {
        const obj = timeConversion(new Date(val).getTime());
        return obj.day + '天' + obj.hour + '时' + obj.minute + '分' + obj.second + '秒'
      },
      input(file) {
        console.log(file, typeof file);
      }
    }
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
</style>
