const { defaultToString } = require('../../util')
const ValuePair = require('../../dictionary/dictionary-v1/value-pair')
const LinkedList = require('../../linked-list/linked-list-v1/linked-list')

class HashTableSeparateChaining {
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
      if (this.table[position] == null) {
        this.table[position] = new LinkedList()
      }
      this.table[position].push(new ValuePair(key, value))
      return true
    }
    return false
  }

  get(key) {
    const position = this.hashCode(key)
    const linkedList = this.table[position]
    if (linkedList && !linkedList.isEmpty()) {
      let current = linkedList.getHead()
      while (current) {
        if (current.element.key === key) {
          return current.element.value
        }
        current = current.next
      }
    }
    return undefined
  }

  remove(key) {
    const position = this.hashCode(key)
    const linkedList = this.table[position]
    if (linkedList && !linkedList.isEmpty()) {
      let current = linkedList.getHead()
      while (current) {
        if (current.element.key === key) {
          linkedList.remove(current.element)
          if (linkedList.isEmpty()) {
            delete this.table[position]
          }
          return true
        }
        current = current.next
      }
    }
    return false
  }

  isEmpty() {
    return this.table.length === 0
  }

  toString() {
    if (this.isEmpty()) {
      return ''
    }
    const keys = Object.keys(this.table)
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString}\n{${keys[i]} => ${this.table[keys[i]].toString()}}`
    }
    return objString
  }
}

module.exports = HashTableSeparateChaining
