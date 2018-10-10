// title 管理

function getTitle(vm) {
  const { title } = vm.$options
  if (title) return (typeof title === 'function' ? title.call(vm) : title) || 'project'
  return ''
}

const serverTitleMixin = {
  created() {
    const title = getTitle(this)
    if (title) this.$ssrContext.title = title
  },
}

const clientTitleMixin = {
  created() {
    const title = getTitle(this)
    if (title) document.title = title
  },
}

export const titleMixin = process && process.env.VUE_ENV === 'server' ? serverTitleMixin : clientTitleMixin
