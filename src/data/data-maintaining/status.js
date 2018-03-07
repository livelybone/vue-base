export default class Status {
  static status = [
    {name: '审核中', value: 'WAIT'},
    {name: '审核通过', value: 'PASS'},
    {name: '审核失败', value: 'FAILED'},
    {name: '已放款', value: 'LOANED'},
    {name: '已贴息', value: 'INTERESTED'},
  ];
}
