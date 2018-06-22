import { AuthToken } from 'data/api/auth-token';
import Vue from 'vue';
import Router from 'vue-router';

// 另一种方式：
// commonjs
// const NotFound = resolve => require.ensure([], require => require('pages/NotFound'), 'NotFound');
// const NotFound =
//       resolve => require.ensure([], require => resolve(require('pages/NotFound')), 'NotFound');
// const NotFound = resolve => require(['pages/NotFound'], resolve); // AMD， 缺点：无法指定 chunkName
const NotFound = () => import('pages/NotFound' /* webpackChunkName:"NotFound" */);
const HelloWorld = () => import('pages/HelloWorld' /* webpackChunkName:"HelloWorld" */);

function routeGuard(store) {
  return (to, fr, next) => {
    if (to.matched.some(route => route.meta.requireAuth) && store.state.user.info.role !== 'client') {
      AuthToken.getUser().then(() => {
        next();
      }).catch(() => {
        next({ name: 'SignIn', redirect: to.fullPath });
        Vue.prototype.snackBar.error('请先登录！');
      });
    } else if (to.matched.some(route => route.meta.requireAdminAuth) && store.state.user.info.role !== 'admin') {
      AuthToken.getAdminUser().then(() => {
        next();
      }).catch(() => {
        next({ name: 'AdminSignIn', redirect: to.fullPath });
        Vue.prototype.snackBar.error('请先登录管理端！');
      });
    } else {
      next();
    }
  };
}

Vue.use(Router);

const routes = [
  { path: '/', name: '', component: HelloWorld },
  { path: '/home', name: 'HelloWorld', component: HelloWorld },
  { path: '/sign-in', name: 'SignIn', component: HelloWorld },
  { path: '/admin-sign-in', name: 'AdminSignIn', component: HelloWorld },
  { path: '/client', meta: { requireAuth: true }, children: [] },
  { path: '/admin', meta: { requireAdminAuth: true }, children: [] },
  { path: '/not-found', component: NotFound },
  { path: '*', component: NotFound },
];

export function createRouter(store) {
  const router = new Router({ mode: 'history', routes });
  if (typeof window !== 'undefined') router.beforeEach(routeGuard(store)); // ssr 取消守卫
  return router;
}
