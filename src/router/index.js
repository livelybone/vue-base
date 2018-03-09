import Vue from 'vue'
import Router from 'vue-router'
import AuthToken from 'extensions/auth-token'
import HelloWorld from 'pages/HelloWorld'

import NotFound from 'pages/NotFound'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'HelloWorld', component: HelloWorld},
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
