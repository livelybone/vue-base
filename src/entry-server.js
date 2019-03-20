/* eslint-disable no-param-reassign */
import { LangStore } from '@/extensions/Langs'
import { createApp } from '@/main'

function resolvePath(url, lang) {
  const $lang = LangStore.langKeys.includes(lang) ? lang : 'zh-hans'
  if (url && url !== '/') {
    const arr = url.split('/').filter(val => val)
    if (LangStore.langKeys.includes(arr[0])) return url
    return `/${$lang}/${url.replace(/^\/*/, '')}`
  }
  return `/${$lang}`
}

/**
 * @return Promise  Because of the existing of asynchronous routing hook functions or components, we return an instance of Promise,
 *                  so that the server can rendering after everything is ready.
 * */
export default context =>
  new Promise((resolve, reject) => {
    const { url, lang } = context
    const { app, router, store } = createApp()
    const { route } = router.resolve(url)
    // resolve the route
    if (route.matched.some(r => r.meta.requireAuth)) {
      // If the route need auth, redirect to `/sign-in` page
      router.replace(resolvePath('/sign-in', lang))
    } else {
      router.replace(resolvePath(url, lang))
    }

    // Wait until router has finished parsing
    // all asynchronous components and hook functions that may be exist
    router.onReady(() => {
      const matches = router.getMatchedComponents()
      // If route do not match, execute the reject function, and return 404
      if (!matches.length) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject({ code: 404 })
      }
      // Call function `asyncData` in all matched components
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
          // Store has been filled with state after Promise resolved.
          // When set to `context.state`,
          // the state will automatically serialized as `window.__INITIAL_STATE__`,
          // and inject into the HTML.
          context.state = store.state
          context.meta = app.$meta()
          resolve(app)
        })
        .catch(reject)
    }, reject)
  })
