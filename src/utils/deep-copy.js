function unExpectedObjType(obj) {
  return obj === null
    || obj instanceof FileList
    || obj instanceof File
    || obj instanceof Date
    || obj instanceof Error
    || obj instanceof RegExp
}

function isCircularStructure(obj, parents = []) { // 判断对象是否循环嵌套， 返回嵌套的起始维度
  const index = Object.keys(parents).find(i => parents[i] === obj)
  return index !== undefined ? { index } : undefined
}

export function simpleDeepCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function copyFn(item, obj, parents = []) {
  const p = [...parents, obj]
  Object.keys(obj).forEach((key) => {
    const isCircular = isCircularStructure(obj[key], p)
    if (isCircular) {
      item[key] = `CircularStructure (dimensional-index:${isCircular.index})`
    } else {
      item[key] = obj[key]
      if (typeof obj[key] === 'object' && !unExpectedObjType(obj[key])) {
        item[key] = new obj[key].constructor()
        copyFn(item[key], obj[key], p)
      }
    }
  })
}

export function deepCopy(obj) {
  if (typeof obj !== 'object' || unExpectedObjType(obj)) return obj

  if (obj instanceof Date) {
    return new Date(obj.getTime())
  }

  if (typeof obj === 'object') {
    const copy = new obj.constructor()
    copyFn(copy, obj)
    return copy
  }
  throw new Error('Unable to copy obj! Its type isn\'t supported.')
}
