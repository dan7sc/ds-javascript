class Deque {
  constructor() {
    this.lastPosition = 0
    this.firstPosition = 0
    this.items = {}
  }

  addFirst(element) {
    if (this.isEmpty()) {
      return this.addLast(element)
    } else if (this.firstPosition > 0) {
      this.firstPosition--
      this.items[this.firstPosition] = element
      return
    } else {
      for (let i = this.lastPosition; i > 0; i--) {
        this.items[i] = this.items[i - 1]
      }
      this.lastPosition++
      this.firstPosition = 0
      this.items[0] = element
    }
  }

  addLast(element) {
    this.items[this.lastPosition] = element
    this.lastPosition++
  }

  removeFirst() {
    if (this.isEmpty()) {
      return undefined
    }
    const deletedFirstElement = this.items[this.firstPosition]
    delete this.items[this.firstPosition]
    this.firstPosition++
    return deletedFirstElement
  }

  removeLast() {
    if (this.isEmpty()) {
      return undefined
    }
    this.lastPosition--
    const deletedLastElement = this.items[this.lastPosition]
    delete this.items[this.lastPosition]
    return deletedLastElement
  }

  peekFirst() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.firstPosition]
  }

  peekLast() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.lastPosition - 1]
  }

  isEmpty() {
    return this.size() === 0
  }

  size() {
    return this.lastPosition - this.firstPosition
  }

  clear() {
    this.items = {}
    this.firstPosition = 0
    this.lastPosition = 0
  }

  toString() {
    if (this.isEmpty()) {
      return ''
    }
    let objString = `${this.items[this.firstPosition]}`
    for (let i = this.firstPosition + 1; i < this.lastPosition; i++) {
      objString = `${objString}, ${this.items[i]}`
    }
    return objString
  }
}

module.exports = Deque
