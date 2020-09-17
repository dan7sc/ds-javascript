const { Compare, defaultCompare } = require('../../util')
const { RedBlackNode, Colors } = require('../../models/redblack-node')
const BinarySearchTree = require('../binary-search-tree-v1/bstree')
const Queue = require('../../queue/queue-v1/queue')

class RedBlackTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn)
    this.compareFn = compareFn
    this.root = null
  }

  insert(key) {
    if(!this.root) {
      this.root = new RedBlackNode(key)
      this.root.color = Colors.BLACK
    } else {
      const newNode = this.insertNode(this.root, key)
      this.fixTreeProperties(newNode)
      return newNode
    }
  }

  insertNode(node, key) {
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if(!node.left) {
        node.left = new RedBlackNode(key)
        node.left.parent = node
        return node.left
      } else {
        return this.insertNode(node.left, key)
      }
    }
    if(this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      if(!node.right) {
        node.right = new RedBlackNode(key)
        node.right.parent = node
        return node.right
      } else {
        return this.insertNode(node.right, key)
      }
    }
  }

  flipColors(parent, uncle, grandParent) {
    parent.color = Colors.BLACK
    grandParent.color = Colors.RED
    if(uncle && uncle.isRed()) {
      uncle.color = Colors.BLACK
    }
  }

  rotateLL(node) {
    const tmp = node.right
    node.right = tmp.left

    if(tmp.left && tmp.left.key) {
      tmp.left.parent = node
    }
    tmp.parent = node.parent
    if(!node.parent) {
      this.root = tmp
    } else {
      if(node === node.parent.left) {
        node.parent.left = tmp
      } else {
        node.parent.right = tmp
      }
    }

    tmp.left = node
    node.parent = tmp
  }

  rotateRR(node) {
    const tmp = node.left
    node.left = tmp.right

    if(tmp.right && tmp.right.key) {
      tmp.right.parent = node
    }
    tmp.parent = node.parent
    if(!node.parent) {
      this.root = tmp
    } else {
      if(node === node.parent.left) {
        node.parent.left = tmp
      } else {
        node.parent.right = tmp
      }
    }

    tmp.right = node
    node.parent = tmp
  }

  fixTreeProperties(node) {
    while(node && node.parent &&
          node.parent.isRed() &&
          node.isRed()) {
      let parent = node.parent
      const grandParent = parent.parent

      if(grandParent && grandParent.left === parent) {
        const uncle = grandParent.right
        if(uncle && uncle.isRed()) {
          this.flipColors(parent, uncle, grandParent)
          node = grandParent
        } else {
          if(node === parent.right) {
            this.rotateLL(parent)
            node = parent
            parent = node.parent
          }
          this.rotateRR(grandParent)
          this.flipColors(parent, uncle, grandParent)
          node = parent
        }
      } else {
        const uncle = grandParent.left
        if(uncle && uncle.isRed()) {
          this.flipColors(parent, uncle, grandParent)
          node = grandParent
        } else {
          if(node === parent.left) {
            this.rotateRR(parent)
            node = parent
            parent = node.parent
          }
          this.rotateLL(grandParent)
          this.flipColors(parent, uncle, grandParent)
          node = parent
        }
      }
    }
    this.root.color = Colors.BLACK
  }

  removeNode(node, key) {
    if(!node) {
      return null
    }
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key)
      return node
    } else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key)
      return node
    } else {
      if(!node.left && !node.right) {
        node = null
        return node
      }
      if(!node.left) {
        node = node.right
        return node
      } else if(!node.right) {
        node = node.left
        return node
      }
      const aux = this.minNode(node.right)
      node.key = aux.key
      node.right = this.removeNode(node.right, aux.key)
      return node
    }
  }


  levelOrderTraverse(callback) {
    const queue = new Queue()
    let current = this.root
    queue.enqueue(current)
    while(queue.items && current) {
      current = queue.dequeue()
      if(current) {
        if(current.left) {
          queue.enqueue(current.left)
        }
        if(current.right) {
          queue.enqueue(current.right)
        }
        callback(`${current.key}#${current.color}`)
      }
    }
  }
}

module.exports = RedBlackTree
