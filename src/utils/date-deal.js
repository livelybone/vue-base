export function dateFormat(time, format) {
  if (!time) return '';
  let date = new Date(time);
  const fmt = [
    {value: 'y', fn: () => date.getFullYear()},
    {value: 'm', fn: () => date.getMonth() + 1},
    {value: 'd', fn: () => date.getDate()},
    {value: 'h', fn: () => date.getHours()},
    {value: 'M', fn: () => date.getMinutes()},
    {value: 's', fn: () => date.getSeconds()}
  ];
  // format 'y-m-d h:M:s'
  let str = format;
  fmt.map(item => {
    let reg = new RegExp(item.value + '+', 'g');
    if (reg.test(str)) str = str.replace(reg, item.fn())
  });
  return str
}

export function timeConversion(time) {
  // time 毫秒数
  const day = parseInt(time / (24 * 60 * 60 * 1000));
  const daySurplus = time % (24 * 60 * 60 * 1000);
  let hour = parseInt(daySurplus / (60 * 60 * 1000));
  let hourSurplus = daySurplus % (60 * 60 * 1000);
  let minute = parseInt(hourSurplus / (60 * 1000));
  let minuteSurplus = hourSurplus % (60 * 1000);
  let second = parseInt(minuteSurplus / (1000));

  return {day, hour, minute, second}
}
