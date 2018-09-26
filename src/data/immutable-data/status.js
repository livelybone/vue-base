export default class Status {
  static status = {
    WAIT: { name: '审核中', value: 'WAIT' },
    PASS: { name: '审核通过', value: 'PASS' },
    NOT_PASS: { name: '审核未通过', value: 'NOT_PASS' },
  }
}
