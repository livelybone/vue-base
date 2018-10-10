export default class Templates {
  static templates = {}

  static copy(key) {
    return JSON.parse(JSON.stringify(Templates.templates[key]))
  }

  static cannotEdit(key) {
    return Templates.copy(key).map((item) => {
      item.canEdit = false
      return item
    })
  }
}
