const { defaultCompare, Compare, swap } = require('../../util')
const MinHeap = require('../min-binary-heap-v1/bheap')

const reverseCompare = (compareFn) => {
  return (a, b) => compareFn(b, a)
}

class MaxHeap extends MinHeap {
  constructor(compareFn = defaultCompare) {
    super(compareFn)
    this.compareFn = reverseCompare(compareFn)
  }

  findMaximum() {
    return this.findMinimum()
  }
}

module.exports = MaxHeap
