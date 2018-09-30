import User from 'data/api/user'
import Vue from 'vue'
import Router from 'vue-router'

// 另一种方式：
// commonjs
// const NotFound = resolve => require.ensure([], require => require('pages/NotFound'), 'NotFound');
// const NotFound =
//       resolve => require.ensure([], require => resolve(require('pages/NotFound')), 'NotFound');
// const NotFound = resolve => require(['pages/NotFound'], resolve); // AMD， 缺点：无法指定 chunkName
const NotFound = () => import('pages/NotFound' /* webpackChunkName:"NotFound" */)
const HelloWorld = () => import('pages/HelloWorld' /* webpackChunkName:"HelloWorld" */)

Vue.use(Router)

const routes = [
  { path: '/', name: '', component: HelloWorld },
  { path: '/home', name: 'HelloWorld', component: HelloWorld },
  { path: '/sign-in', name: 'SignIn', component: HelloWorld },
  { path: '/admin-sign-in', name: 'AdminSignIn', component: HelloWorld },
  { path: '/client', meta: { requireAuth: true }, children: [] },
  { path: '/admin', meta: { requireAdminAuth: true }, children: [] },
  { path: '/not-found', component: NotFound },
  { path: '*', component: NotFound },
]

export function createRouter(store) {
  const router = new Router({
    mode: 'history',
    routes,
  })

  router.beforeEach((to, fr, next) => {
    if (to.matched.some(route => route.meta.requireAuth) && store.state.user.info.role !== 'client') {
      User.getUser().then(() => {
        next()
      }).catch(() => {
        next({ name: 'SignIn', redirect: to.fullPath })
        Vue.prototype.snackBar.error('请先登录！')
      })
    } else if (to.matched.some(route => route.meta.requireAdminAuth) && store.state.user.info.role !== 'admin') {
      User.getAdminUser().then(() => {
        next()
      }).catch(() => {
        next({ name: 'AdminSignIn', redirect: to.fullPath })
        Vue.prototype.snackBar.error('请先登录管理端！')
      })
    } else next()
  })

  return router
}
