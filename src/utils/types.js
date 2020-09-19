const { toString } = Object.prototype

export const isFun = (target) => toString.call(target) === '[object Function]'

export const isObj = (target) => toString.call(target) === '[object Object]'

export const isArr = (target) => Array.isArray(target)

export const isNull = (target) => toString.call(target) === '[object Null]'

export const isStr = (target) => typeof target === 'string'

export const isNum = (target) => typeof target === 'number'
