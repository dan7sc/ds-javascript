const DoublyLinkedList = require('../doubly-linked-list-v1/doubly-linked-list')

class StackLinkedList {
  constructor() {
    this.items = new DoublyLinkedList()
  }

  push(element) {
    this.items.insert(element, this.size())
  }

  pop() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items.removeAt(this.size() - 1)
  }

  peek() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items.getElementAt(this.size() - 1).element
  }

  isEmpty() {
    return this.items.isEmpty()
  }

  size() {
    return this.items.size()
  }

  clear() {
    return this.items.clear()
  }

  toString() {
    return this.items.toString()
  }
}

module.exports = StackLinkedList
