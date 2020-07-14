const { defaultEquals } = require('../../util')
const Node = require('../../models/linked-list-node')

class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.numberOfElements = 0
    this.head = null
    this.equalsFn = equalsFn
  }

  push(element) {
    const node = new Node(element)
    let current
    if (this.head === null) {
      this.head = node
    } else {
      current = this.head
      while (current.next !== null) {
        current = current.next
      }
      current.next = node
    }
    this.numberOfElements++
  }

  removeAt(index) {
    if (index >= 0 && index < this.numberOfElements ) {
      let current = this.head
      if (index === 0) {
        this.head = current.next
      } else {
        const previous = this.getElementAt(index - 1)
        current = previous.next
        previous.next = current.next
      }
      this.numberOfElements--
      return current.element
    }
    return undefined
  }

  getElementAt(index) {
    if (index >= 0 && index < this.numberOfElements) {
      let node = this.head
      for (let i = 0; i < index && node !== null; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }

  insert(element, index) {
    if (index >= 0 && index <= this.numberOfElements) {
      const node = new Node(element)
      if (index === 0) {
        node.next = this.head
        this.head = node
      } else {
        const previous = this.getElementAt(index - 1)
        node.next = previous.next
        previous.next = node
      }
      this.numberOfElements++
      return true
    }
    return false
  }

  indexOf(element) {
    let current = this.head
    for (let i = 0; i < this.numberOfElements && current; i++) {
      if (this.equalsFn(element, current.element)) {
        return i
      }
      current = current.next
    }
    return -1
  }

  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  size() {
    return this.numberOfElements
  }

  isEmpty() {
    return this.size() === 0
  }

  getHead() {
    return this.head
  }

  toString() {
    if (this.head === null) {
      return ''
    }
    let objString = `${this.head.element}`
    let current = this.head.next
    for (let i = 1; i < this.size(); i++) {
      objString = `${objString}, ${current.element}`
      current = current.next
    }
    return objString
  }
}

module.exports = LinkedList
