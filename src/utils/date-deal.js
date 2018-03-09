import moment from 'moment'

export function dateFormat(time, format) {
  return moment(time).format(format)
}

export function timeConversion(time) {
  // time 毫秒数
  const duration = moment.duration(time);
  return {
    day: Math.floor(duration.asDays()),
    hour: duration.hours(),
    minute: duration.minutes(),
    second: duration.seconds()
  }
}
