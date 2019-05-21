/**
 * @desc 表单项的值处理
 * @desc Process the form items
 */
export default class FormItemsConvert {
  /**
   * @desc 处理成 json 对象
   * @desc Process into a JSON object
   * */
  static toData(formItems) {
    const data = {}
    formItems.forEach(item => {
      if (item.name) data[item.name] = item.value
    })
    return data
  }
}
