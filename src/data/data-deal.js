export default class DataDeal {
  static dataDeal(dataArr) {
    const data = {}
    dataArr.forEach((item) => {
      if (item.alias) data[item.alias] = item.value
    })
    return data
  }
}
