import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
  parse,
} from 'date-fns'

export function dateFormatter(time, fmt) {
  return format(parse(time), fmt)
}

export function timeConversion(time) {
  // time 毫秒数
  const d = parse(time)
  const now = new Date()
  return {
    day: Math.floor(differenceInDays(d, now)),
    hour: differenceInHours(d, now) % 24,
    minute: differenceInMinutes(d, now) % 60,
    second: differenceInSeconds(d, now) % 60,
  }
}
