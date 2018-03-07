export function simpleDeepCopy (obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function deepCopy (obj) {
  if (obj === null || typeof obj !== 'object') return obj;

  if (obj instanceof Date) {
    return new Date(obj.getTime())
  }

  if (typeof obj === 'object') {
    let copy = new obj.constructor();
    copyFn(copy, obj);
    return copy
  }
  throw new Error('Unable to copy obj! Its type isn\'t supported.')
}

export function copyFn (copyObj, obj) {
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      copyObj[i] = obj[i];
      if (typeof obj[i] === 'object') {
        copyObj[i] = new obj[i].constructor();
        copyFn(copyObj[i], obj[i])
      }
    }
  }
}
