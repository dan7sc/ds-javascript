const { defaultToString } = require('../../util')
const ValuePair = require('../../dictionary/dictionary-v1/value-pair')

class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn
    this.table = {}
  }

  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key
    }
    const tableKey = this.toStrFn(key)
    let hash = 0
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i)
    }
    return hash % 37
  }

  hashCode(key) {
    return this.loseloseHashCode(key)
  }

  put(key, value) {
    if (!!key && !!value) {
      const position = this.hashCode(key)
      this.table[position] = new ValuePair(key, value)
      return true
    }
    return false
  }

  get(key) {
    const valuePair = this.table[this.hashCode(key)]
    return !valuePair ? undefined : valuePair.value
  }

  remove(key) {
    const hash = this.hashCode(key)
    const valuePair = this.table[hash]
    if (valuePair) {
      delete this.table[hash]
      return true
    }
    return false
  }
}

module.exports = HashTable
