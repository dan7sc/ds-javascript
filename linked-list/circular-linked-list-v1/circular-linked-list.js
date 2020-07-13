const LinkedList = require('../linked-list-v1/linked-list')
const Node = require('../../models/linked-list-node')
const defaultEquals = require('../../util')

class CircularLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn)
  }

  insert(element, index) {
    if (index >= 0 && index <= this.numberOfElements) {
      const node = new Node(element)
      let current = this.head
      if (index === 0) {
        if (!this.head) {
          this.head = node
          node.next = this.head
        } else {
          node.next = current
          current = this.getElementAt(this.size() - 1)
          this.head = node
          current.next = this.head
        }
      } else {
        const previous = this.getElementAt(index - 1)
        current = previous.next
        node.next = current
        previous.next = node
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
        if (this.size() === 1) {
          this.head = null
        } else {
          const last = this.getElementAt(this.size() - 1)
          this.head = current.next
          last.next = this.head
        }
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
}

module.exports = CircularLinkedList
