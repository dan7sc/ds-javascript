const { defaultEquals, Compare, defaultCompare } = require('../../util')
const LinkedList = require('../linked-list-v1/linked-list')

class SortedLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
    super(equalsFn)
    this.compareFn = compareFn
  }

  insert(element, index = 0) {
    if (this.isEmpty()) {
      return super.insert(element, 0)
    }
    const position = this.getIndexNextSortedElement(element)
    return super.insert(element, position)
  }

  getIndexNextSortedElement(element) {
    let current = this.head
    let index
    for (index = 0; index < this.size() && current; index++) {
      const compared = this.compareFn(element, current.element)
      if (compared === Compare.LESS_THAN) {
        return index
      }
      current = current.next
    }
    return index
  }
}

module.exports = SortedLinkedList
