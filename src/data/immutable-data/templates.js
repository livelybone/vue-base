import { deepCopy } from 'utils/deep-copy'

export default class Templates {
  static templates = {}

  static copy(key) {
    return deepCopy(Templates.templates[key])
  }

  static cannotEdit(key) {
    return Templates.copy(key).map((item) => {
      item.canEdit = false
      return item
    })
  }
}
