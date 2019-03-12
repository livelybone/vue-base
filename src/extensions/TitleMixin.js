// title 管理

function getTitle(vm) {
  const { title } = vm
  if (title)
    return (
      (typeof title === 'function' ? title.call(vm) : title) || vm.$t('title')
    )
  return vm.$t('title')
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

export const TitleMixin =
  process && process.env.VUE_ENV === 'server'
    ? serverTitleMixin
    : clientTitleMixin
