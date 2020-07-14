const LinkedList = require('../linked-list-v1/linked-list')
const Node = require('../../models/linked-list-node')
const { defaultEquals } = require('../../util')

class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next)
    this.prev = null
  }
}

class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn)
    this.tail = null
  }

  insert(element, index) {
    if (index >= 0 && index <= this.numberOfElements) {
      const node = new DoublyNode(element)
      let current = this.head
      if (index === 0) {
        if (!this.head) {
          this.head = node
          this.tail = node
        } else {
          node.next = this.head
          current.prev = node
          this.head = node
        }
      } else if (index === this.numberOfElements) {
        current = this.tail
        node.prev = this.tail
        current.next = node
        this.tail = node
      } else {
        const previous = this.getElementAt(index - 1)
        current = previous.next
        node.next = current
        node.prev = previous
        previous.next = node
        current.prev = node
      }
      this.numberOfElements++
      return true
    }
    return false
  }

  removeAt(index) {
    if (index >= 0 && index < this.numberOfElements) {
      let current = this.head
      if (index === 0) {
        if (this.numberOfElements === 1) {
          this.head = null
          this.tail = null
        } else {
          this.head = current.next
          this.head.prev = null
        }
      } else if (index === this.numberOfElements - 1) {
        current = this.tail
        this.tail = current.prev
        this.tail.next = null
      } else {
        current = this.getElementAt(index)
        current.prev.next = current.next
        current.next.prev = current.prev
      }
      this.numberOfElements--
      return current.element
    }
    return undefined
  }
}

module.exports = DoublyLinkedList
