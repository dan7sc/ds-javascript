const { Compare, defaultCompare } = require('../../util')
const Node = require('../../models/bstree-node')
const Queue = require('../../queue/queue-v1/queue')

class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn
    this.root = null
  }

  insert(key) {
    if(!this.root) {
      this.root = new Node(key)
    } else {
      this.insertNode(this.root, key)
    }
  }

  insertNode(node, key) {
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if(!node.left) {
        node.left = new Node(key)
      } else {
        this.insertNode(node.left, key)
      }
    } else {
      if(!node.right) {
        node.right = new Node(key)
      } else {
        this.insertNode(node.right, key)
      }
    }
  }

  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback)
  }

  inOrderTraverseNode(node, callback) {
    if(!!node) {
      this.inOrderTraverseNode(node.left, callback)
      callback(node.key)
      this.inOrderTraverseNode(node.right, callback)
    }
  }


  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback)
  }

  preOrderTraverseNode(node, callback) {
    if(!!node) {
      callback(node.key)
      this.preOrderTraverseNode(node.left, callback)
      this.preOrderTraverseNode(node.right, callback)
    }
  }

  posOrderTraverse(callback) {
    this.posOrderTraverseNode(this.root, callback)
  }

  posOrderTraverseNode(node, callback) {
    if(!!node) {
      this.posOrderTraverseNode(node.left, callback)
      this.posOrderTraverseNode(node.right, callback)
      callback(node.key)
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
        callback(current.key)
      }
    }
  }

  min() {
    return this.minNode(this.root)
  }

  minNode(node) {
    let current = node
    while(current && current.left) {
      current = current.left
    }
    return current
  }

  max() {
    return this.maxNode(this.root)
  }

  maxNode(node) {
    let current = node
    while(current && current.right) {
      current = current.right
    }
    return current
  }

  search(key) {
    return this.searchNode(this.root, key)
  }

  searchNode(node, key) {
    if(!node) {
      return false
    }
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key)
    } else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key)
    } else {
      return true
    }
  }

  remove(key) {
    this.root = this.removeNode(this.root, key)
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
}

module.exports = BinarySearchTree
