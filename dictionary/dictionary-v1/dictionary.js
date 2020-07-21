const { defaultToString } = require('../../util')
const ValuePair = require('./value-pair')

class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  hasKey(key) {
    return !!this.table[this.toStrFn(key)]
  }

  set(key, value) {
    if (!!key && !!value) {
      const tableKey = this.toStrFn(key)
      this.table[tableKey] = new ValuePair(key, value)
      return true
    }
    return false
  }

  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)]
      return true
    }
    return false
  }

  get(key) {
    const valuePair = this.table[this.toStrFn(key)]
    return !valuePair ? undefined : valuePair.value
  }

  keyValues() {
    return Object.values(this.table)
  }

  legacyKeyValues() {
    const valuePairs = []
    for (const k in this.table) {
      if (this.hasKey(k)) {
        valuePairs.push(this.table[k])
      }
    }
    return valuePairs
  }

  keys() {
    return this.keyValues().map(valuePair => valuePair.key)
  }

  values() {
    return this.keyValues().map(valuePair => valuePair.value)
  }

  forEach(callbackFn) {
    const valuePairs = this.keyValues()
    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value)
      if (result === false) {
        break
      }
    }
  }

  size() {
    return Object.keys(this.table).length
  }

  isEmpty() {
    return this.size() === 0
  }

  clear() {
    this.table = {}
  }

  toString() {
    if (this.isEmpty()) {
      return ''
    }
    const valuePairs = this.keyValues()
    let objString = `${valuePairs[0].toString()}`
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString}, ${valuePairs[i].toString()}`
    }
    return objString
  }
}

module.exports = Dictionary
