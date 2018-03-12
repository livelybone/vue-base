import Vue from 'vue'
import Router from 'vue-router'
import AuthToken from 'extensions/auth-token';

// 另一种方式：
// const NotFound = resolve => require.ensure([], require => require('pages/NotFound'), 'NotFound'); // commonjs
// const NotFound = resolve => require.ensure([], require => resolve(require('pages/NotFound')), 'NotFound'); // commonjs
// const NotFound = resolve => require(['pages/NotFound'], resolve); // AMD， 缺点：无法指定 chunkName
const NotFound = resolve => import('pages/NotFound' /* webpackChunkName:"NotFound" */);
const HelloWorld = resolve => import('pages/HelloWorld' /* webpackChunkName:"HelloWorld" */);

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'HelloWorld', component: HelloWorld},
    {path: '/home', name: 'HelloWorld', component: HelloWorld},
    {path: '/sign-in', name: 'SignIn', component: HelloWorld},
    {path: '/admin-sign-in', name: 'AdminSignIn', component: HelloWorld},
    {path: '/client', meta: {requireAuth: true}, children: []},
    {path: '/admin', meta: {requireAdminAuth: true}, children: []},
    {path: '/not-found', component: NotFound},
    {path: '*', component: NotFound},
  ]
});

router.beforeEach((to, fr, next) => {
  if (to.matched.some(route => route.meta.requireAuth) && !Vue.prototype.$store.state.user.id) {
    AuthToken.getUser().then(() => {
      next()
    }).catch(e => {
      next({name: 'SignIn', redirect: to.fullPath});
      Vue.prototype.snackBar.error('请先登录！');
    })
  } else if (to.matched.some(route => route.meta.requireAdminAuth) && !Vue.prototype.$store.state.admin.id) {
    AuthToken.getAdminUser().then(() => {
      next()
    }).catch(e => {
      next({name: 'AdminSignIn', redirect: to.fullPath});
      Vue.prototype.snackBar.error('请先登录管理端！');
    })
  } else next();
});

export default router
