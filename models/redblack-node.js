const Node = require('./bstree-node')

const Colors = {
  RED: 0,
  BLACK: 1
}

class RedBlackNode extends Node {
  constructor(key) {
    super(key)
    this.key = key
    this.color = Colors.RED
    this.parent = null
  }

  isRed() {
    return this.color === Colors.RED
  }
}

module.exports = {
  RedBlackNode,
  Colors
}
