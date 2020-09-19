const { defaultCompare, Compare, swap } = require('../../util')

class MinHeap {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn
    this.heap = []
  }

  getLeftIndex(index) {
    return 2 * index + 1
  }

  getRightIndex(index) {
    return 2 * index + 2
  }

  getParentIndex(index) {
    if(index === 0) {
      return undefined
    }
    return Math.floor((index - 1) / 2)
  }

  insert(value) {
    if(value) {
      this.heap.push(value)
      this.siftUp(this.heap.length - 1)
      return true
    }
    return false
  }

  siftUp(index) {
    let parent = this.getParentIndex(index)
    while(index > 0 &&
          this.compareFn(
            this.heap[parent], this.heap[index]
          ) > Compare.LESS_THAN) {
      swap(this.heap, parent, index)
      index = parent
      parent = this.getParentIndex(index)
    }
  }

  extract() {
    if(this.isEmpty()) {
      return undefined
    }
    if(this.size() === 1) {
      return this.heap.shift()
    }
    const removedValue = this.heap.shift()
    this.siftdown(0)
    return removedValue
  }

  siftdown(index) {
    let element = index
    const left = this.getLeftIndex(index)
    const right = this.getRightIndex(index)
    const size = this.size()
    if(index < size &&
       this.compareFn(
         this.heap[element], this.heap[left]) > Compare.LESS_THAN) {
      element = left
    }
    if(index < size &&
       this.compareFn(
         this.heap[element], this.heap[right]) > Compare.LESS_THAN) {
      element = right
    }
    if(index !== element) {
      swap(this.heap, index, element)
      this.siftdown(element)
    }
  }

  size() {
    return this.heap.length
  }

  isEmpty() {
    return this.size() === 0
  }

  findMinimum() {
    return this.isEmpty() ? undefined : this.heap[0]
  }
}

module.exports = MinHeap
