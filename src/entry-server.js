/* eslint-disable no-param-reassign */
import { LangStore } from '@/extensions/Langs'
import { createApp } from '@/main'

function redirect(url) {
  if (url && url !== '/') {
    const arr = url.split('/').filter(val => val)
    if (LangStore.langKeys.includes(arr[0])) return url
    return `/zh-hans/${url.replace(/^\/*/, '')}`
  }
  return '/zh-hans'
}

/**
 * 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
 * 以便服务器能够等待所有的内容在渲染前，就已经准备就绪。
 * */
export default context =>
  new Promise((resolve, reject) => {
    const { url } = context
    const { app, router, store } = createApp()
    const { route } = router.resolve(url)
    // 设置服务器端 router 的位置
    if (route.matched.some(r => r.meta.requireAuth)) {
      // 如果页面需要登录，则直接返回登录页面
      router.replace('/sign-in')
    } else if (route.matched.some(r => r.meta.requireAdminAuth)) {
      // 如果页面需要管理员权限，则直接返回管理员登录页面
      router.replace('/admin-sign-in')
    } else {
      router.replace(redirect(url))
    }
    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matches = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matches.length) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject({ code: 404 })
      }
      // 对所有匹配的路由组件调用 `asyncData()`
      return Promise.all(
        matches.map(
          component =>
            component.asyncData &&
            component.asyncData({
              store,
              route: router.currentRoute,
            }),
        ),
      )
        .then(() => {
          // 在所有预取钩子(preFetch hook) resolve 后，
          // 我们的 store 现在已经填充入渲染应用程序所需的状态。
          // 当我们将状态附加到上下文，
          // 并且 `template` 选项用于 renderer 时，
          // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
          context.state = store.state
          // Promise 应该 resolve 应用程序实例，以便它可以渲染
          resolve(app)
        })
        .catch(reject)
    }, reject)
  })
