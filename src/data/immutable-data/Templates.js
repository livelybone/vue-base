import { objectSimpleCopy } from '@livelybone/copy'

export default class Templates {
  static templates = {}

  static copy(key) {
    return objectSimpleCopy(Templates.templates[key])
  }

  static cannotEdit(key) {
    return Templates.copy(key).map(item => {
      item.canEdit = false
      return item
    })
  }
}
