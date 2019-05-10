import User from '@/api/User'
import { LangStore } from '@/common/extensions/Langs'
import ProgressBar from '@/common/utils/ProgressBar'
import { isBrowser } from '@/common/utils/UserAgent'
import { divRootUrl, joinWithRootUrl } from '@/common/utils/RequestInterceptor'
import NotFound from '@/pages/NotFound'
import Vue from 'vue'
import Router from 'vue-router'

// 另一种方式：
// commonjs
// const NotFound = resolve => require.ensure([], require => require('@/pages/NotFound'), 'NotFound')
// const NotFound =
//       resolve => require.ensure([], require => resolve(require('@/pages/NotFound')), 'NotFound')
// const NotFound = resolve => require(['@/pages/NotFound'], resolve)
// The package name cannot be specified in this way
const HelloWorld = () =>
  import('@/pages/HelloWorld' /* webpackChunkName:"HelloWorld" */)

Vue.use(Router)

const RouterView = {
  render() {
    return <router-view />
  },
}

const routes = [
  {
    path: joinWithRootUrl(':lang'),
    component: RouterView,
    children: [
      { path: '', name: '', component: HelloWorld },
      { path: 'home', name: 'HelloWorld', component: HelloWorld },
      { path: 'sign-in', name: 'SignIn', component: HelloWorld },
      { path: 'user-center', meta: { requireAuth: true }, children: [] },
      { path: 'not-found', component: NotFound },
      { path: '*', component: NotFound },
    ],
  },
]

export function createRouter(i18n, store) {
  const router = new Router({
    mode: 'history',
    routes,
  })

  if (isBrowser) {
    router.beforeEach((to, fr, next) => {
      const {
        params: { lang },
      } = to
      const language = (lang || '').toLowerCase()
      if (!LangStore.langKeys.includes(language)) {
        /** Redirect */
        next({ path: joinWithRootUrl(i18n.locale, divRootUrl(to.path)) })
      } else {
        ProgressBar.start()

        const pro = LangStore.setLang(language, { $i18n: i18n })

        /** Auth */
        if (
          to.matched.some(route => route.meta.requireAuth) &&
          store.state.user.info.role !== 'client'
        ) {
          User.getUser()
            .then(() => {
              pro.then(() => next())
            })
            .catch(() => {
              pro.then(() => next({ name: 'SignIn', redirect: to.fullPath }))
              Vue.prototype.snackbar.error('Please sign in!')
            })
        } else {
          /** Go ahead */
          pro.then(() => next())
        }
      }
    })
  } else {
    router.beforeEach((to, fr, next) => {
      const pro = LangStore.setLang(to.params.lang, { $i18n: i18n })
      pro.then(() => next())
    })
  }

  router.afterEach(() => {
    ProgressBar.end()
  })

  return router
}
