export default class DataDeal {
  static dataDeal(dataArr) {
    const data = {}
    dataArr.forEach(item => {
      if (item.name) data[item.name] = item.value
    })
    return data
  }
}
