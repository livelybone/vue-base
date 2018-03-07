import initialStore from 'extensions/store'

export default function initStore() {
  initialStore({
    user: {},
    admin: {},
  })
}
