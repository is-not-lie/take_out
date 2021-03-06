// 操作类型判断函数
const _toString = Object.prototype.toString
const isObj = (obj) => _toString.call(obj) === '[object Object]'
const isArr = (arr) => _toString.call(arr) === '[object Array]'
const isNum = (num) => typeof num === 'number'
const isStr = (str) => typeof str === 'string'

/*
操作Storage的类
  new实例时必须传入一个key,且类型为字符串
  可以传入初始值,不传则为null,
  可以传入存储类型(localStorage / sessionStorage),默认为localStorage
  可以通过this.value来获取值,也可以通过get方法获取值
  方法概述:
    get => 获取存储的key对应的所有值
    set => 修改存储的key对应的所有值
    del => 删除存储的key对应的所有值
    getOne => 获取存储的key对应的值中指定索引的值
    setOne => 修改存储的key对应的值中指定索引的值
    delOne => 删除存储的key对应的值中指定索引的值
    (若存储的数据类型为数组或字符串,索引请传入数值类型,若为对象则传入字符串类型)
*/
export default class Storage {
  constructor (key, value, type = 'local') {
    if (key && isStr(key)) {
      this.key = key
      switch (type) {
        case 'local':
          this.storage = window.localStorage
          break
        case 'session':
          this.storage = window.sessionStorage
          break
        default:
          this.storage = window.localStorage
          break
      }
      if (value) this.set(value)
      else this.value = this.get()
    } else throw new Error('key is required and type is string')
  }

  get () {
    const { storage, key } = this
    return JSON.parse(storage.getItem(key) || '{}')
  }

  set (value) {
    const { storage, key } = this
    if (value) {
      this.value = value
      value = isStr(value) ? value : JSON.stringify(value)
      storage.setItem(key, value)
    } else throw new Error('value is required')
  }

  del () {
    const { storage, key } = this
    storage.removeItem(key)
    this.value = {}
  }

  getOne (index) {
    const { value } = this
    if (isNum(index) || isStr(index)) return value[index]
    else throw new Error('typeError: index is not number or string')
  }

  setOne (index, params) {
    let { value } = this
    if (isNum(index)) {
      if (isArr(value)) value.splice(index, 1, params)
      else if (isStr(value)) { value = value.split().splice(index, 1, params).join() }
    } else if (isStr(index) && isObj(value)) value[index] = params
    else throw new Error('value is null in storage')
    this.set(value)
  }

  delOne (index) {
    let { value } = this
    if (isNum(index)) {
      if (isArr(value)) value.splice(index, 1)
      else if (isStr(value)) { value = value.split().splice(index, 1).join() }
    } else if (isStr(index) && isObj(value)) delete value[index]
    else throw new Error('value is null in storage')
    this.set(value)
  }
}
