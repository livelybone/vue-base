import User from '@/data/api/User'
import { LangStore } from '@/extensions/Langs'
import NotFound from '@/pages/NotFound'
import Vue from 'vue'
import Router from 'vue-router'

// 另一种方式：
// commonjs
// const NotFound = resolve => require.ensure([], require => require('@/pages/NotFound'), 'NotFound');
// const NotFound =
//       resolve => require.ensure([], require => resolve(require('@/pages/NotFound')), 'NotFound');
// const NotFound = resolve => require(['@/pages/NotFound'], resolve); // AMD， 缺点：无法指定 chunkName
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
    path: '/:lang',
    component: RouterView,
    redirect: { path: '' },
    children: [
      { path: '', name: '', component: HelloWorld },
      { path: 'home', name: 'HelloWorld', component: HelloWorld },
      { path: 'sign-in', name: 'SignIn', component: HelloWorld },
      { path: 'admin-sign-in', name: 'AdminSignIn', component: HelloWorld },
      { path: 'client', meta: { requireAuth: true }, children: [] },
      { path: 'admin', meta: { requireAdminAuth: true }, children: [] },
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

  router.beforeEach((to, fr, next) => {
    const {
      params: { lang },
    } = to
    const language = (lang || '').toLowerCase()
    if (!LangStore.langKeys.includes(language)) {
      next({
        path: `/${i18n.locale}${to.path}`,
      })
    } else {
      const pro = LangStore.setLang(language, { $i18n: i18n })
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
            Vue.prototype.snackBar.error('Please sign in!')
          })
      } else if (
        to.matched.some(route => route.meta.requireAdminAuth) &&
        store.state.user.info.role !== 'admin'
      ) {
        User.getAdminUser()
          .then(() => {
            pro.then(() => next())
          })
          .catch(() => {
            pro.then(() => next({ name: 'AdminSignIn', redirect: to.fullPath }))
            Vue.prototype.snackBar.error('Please sign in the admin terminal!')
          })
      } else pro.then(() => next())
    }
  })

  return router
}
