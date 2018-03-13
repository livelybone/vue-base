export function simpleDeepCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function deepCopy(obj) {
  if (obj === null || typeof obj !== 'object' || obj instanceof FileList || obj instanceof File || obj instanceof Date) return obj;

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

export function copyFn(copyObj, obj) {
  Object.keys(obj).map(key => {
    copyObj[key] = obj[key];
    if (typeof obj[key] === 'object' && !(obj[key] instanceof FileList || obj[key] instanceof File || obj instanceof Date)) {
      copyObj[key] = new obj[key].constructor();
      copyFn(copyObj[key], obj[key])
    }
  })
}
