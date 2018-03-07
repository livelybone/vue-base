import initialBus from 'extensions/bus'
import initialHttp from 'extensions/http'
import initStore from 'data/init-store'

export default function () {
  initialBus();
  initialHttp();
  initStore()
}
