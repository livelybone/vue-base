export default class DataDeal{

  static dataDeal(dataArr) {
    const data = {};
    dataArr.map(item => {
      if (item.alias) data[item.alias] = item.value
    });
    return data
  }
}
